import "server-only";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import {connectToDB} from "@/mongodb/database";
import bcrypt from "bcrypt";
import {Stripe} from "stripe";
import {EMAIL_REGEX} from "@/constants";

export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials, req) {
                if (!credentials) {
                    console.error("Invalid request");
                    throw new Error("Invalid request");
                }
                if (!credentials["email"]) {
                    console.error("Email is required");
                    throw new Error("Email is required");
                }
                if (!credentials["password"]) {
                    console.error("Password is required");
                    throw new Error("Password is required");
                }
                if (!credentials["token"]) {
                    console.error("Token is required");
                    throw new Error("Token is required");
                }

                const {email, password, token} = credentials;

                const response = await fetch(
                    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        cache: "no-store",
                    }
                );
                const resData = await response.json();
                if (!resData.success || resData.score < 0.5) {
                    console.warn("Token is invalid");
                    throw new Error("Token is invalid");
                }

                await connectToDB();

                const user = await User.findOne({"profile.email": email});
                if (!user) {
                    throw new Error("Sorry, we could not find your account.");
                }

                if (!user.profile.hashedPassword) {
                    throw new Error("Please sign in with OAuth or reset your password.");
                }
                const passwordMatch = await bcrypt.compare(password, user.profile.hashedPassword);
                if (!passwordMatch) {
                    throw new Error("Incorrect password.");
                }

                user.lastLogin = new Date();
                await user.save();
                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            if (account?.provider === "credentials") {
                token.email = user.profile.email;
                token.image = user.profile.image;
            } else if (account?.provider === "google") {
                token.email = user.email;
                token.image = user.image;
            }
            return token;
        },
        async session({session, token}) {
            await connectToDB();
            const sessionUser = await User.findOne({"profile.email": token.email});
            session.user.id = sessionUser._id.toString();
            session.user.email = sessionUser.profile.email;
            session.user.image = sessionUser.profile.image;
            session.user.username = sessionUser.profile.username;
            session.user.name = sessionUser.profile.name;
            session.user.stripe = {};
            session.user.stripe.status = sessionUser.stripe.status;
            session.user.stripe.subscriptionCredits = sessionUser.credits.subscriptionCredits;
            session.user.stripe.rechargeCredits = sessionUser.credits.rechargeCredits;
            return session;
        },
        async signIn({account, profile, user, credentials}) {
            if (account.provider === "google") {
                try {
                    await connectToDB();
                    const userExists = await User.findOne({"profile.email": profile.email});

                    if (!userExists) {
                        if (!profile.email) {
                            console.error("Email is required");
                            return false;
                        }
                        if (!profile.picture) {
                            console.error("Image is required");
                            return false;
                        }
                        if (!EMAIL_REGEX.test(profile.email)) {
                            console.error("Email is invalid");
                            return false;
                        }

                        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

                        const customer = await stripe.customers.create({
                            email: profile.email,
                            name: profile.email.substring(0, profile.email.indexOf("@")).substring(0, 15),
                        });

                        await User.create({
                            profile: {
                                email: profile.email,
                                image: profile.picture,
                            },
                            stripe: {
                                stripeCustomerId: customer.id,
                            },
                            emailVerified: new Date(),
                            lastLogin: new Date(),
                        });
                    } else {
                        userExists.lastLogin = new Date();
                        userExists.emailVerified = new Date();
                        await userExists.save();
                    }
                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            } else if (account.provider === "discord") {
                try {
                    await connectToDB();
                    const userExists = await User.findOne({"profile.email": profile.email});

                    if (!userExists) {
                        if (!profile.email) {
                            console.error("Email is required");
                            return false;
                        }
                        if (!profile.image_url) {
                            console.error("Image is required");
                            return false;
                        }
                        if (!EMAIL_REGEX.test(profile.email)) {
                            console.error("Email is invalid");
                            return false;
                        }

                        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

                        const customer = await stripe.customers.create({
                            email: profile.email,
                            name: profile.email.substring(0, profile.email.indexOf("@")).substring(0, 15),
                        });

                        await User.create({
                            profile: {
                                email: profile.email,
                                image: profile.image_url,
                            },
                            stripe: {
                                stripeCustomerId: customer.id,
                            },
                            emailVerified: new Date(),
                            lastLogin: new Date(),
                        });
                    } else {
                        userExists.lastLogin = new Date();
                        userExists.emailVerified = new Date();
                        await userExists.save();
                    }
                    return true;
                } catch (error) {
                    console.error(error);
                    return false;
                }
            } else {
                return true;
            }
        },
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
