"use client";

import styles from "../styles/Login.module.css";
import {getProviders, signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import AlertDismissible from "@/components/AlertDismissible";
import {EMAIL_REGEX} from "@/constants";
import Image from "next/image";

const Login = () => {
    const [providers, setProviders] = useState(null);
    const {data: session, status} = useSession();
    const {executeRecaptcha} = useGoogleReCaptcha();

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
        position: "tr",
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            const fetchProviders = async () => {
                const providers = await getProviders();
                setProviders(providers);
            };
            fetchProviders().then(() => {});
        }
        if (status === "authenticated") {
            if (!session.user.username) {
                redirect("/create-username");
                return;
            }
            redirect("/");
        }
    }, [session, status]);

    async function handleLogin(e) {
        e.preventDefault();

        if (!executeRecaptcha) {
            console.warn("Recaptcha not loaded");
            setAlert({
                open: true,
                message: "reCAPTCHA error. Please try again later.",
                severity: "error",
                position: "tr",
            });
            return;
        }

        let isValid = true;

        // Validate email
        if (!EMAIL_REGEX.test(email)) {
            setEmailError("Check your email address");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (password.length < 8) {
            setPasswordError("Check your password");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (isValid) {
            try {
                const token = await executeRecaptcha("register");
                const res = await signIn("credentials", {
                    email: email,
                    password: password,
                    token: token,
                    redirect: false,
                    callbackUrl: "/",
                });

                if (res.error) {
                    if (res.error === "Sorry, we could not find your account." || res.error === "Incorrect password.") {
                        setEmailError("Check your email address");
                        setPasswordError("Email or password is invalid");
                    } else if (res.error === "Please sign in with OAuth or reset your password.") {
                        setEmailError("Please sign in with Google/Discord or reset your password.");
                        setAlert({
                            open: true,
                            message: "Please sign in with Google/Discord or reset your password.",
                            severity: "error",
                            position: "tr",
                        });
                    } else {
                        console.error(res);
                        setAlert({
                            open: true,
                            message: "Something went wrong. Please try again later.",
                            severity: "error",
                            position: "tr",
                        });
                    }
                }
            } catch (error) {
                console.error(error);
                setAlert({
                    open: true,
                    message: "Something went wrong. Please try again later.",
                    severity: "error",
                    position: "tr",
                });
            }
        }
    }

    return (
        <>
            <main>
                <AlertDismissible
                    alertOpen={alert.open}
                    setAlert={setAlert}
                    message={alert.message}
                    severity={alert.severity}
                    position={alert.position}
                />
                <div className="min-h-full flex font-plus-jakarta-sans" style={{minHeight: "100vh"}}>
                    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
                        <div className="mx-auto w-full max-w-sm lg:w-96">
                            <div>
                                <a href="/">
                                    <Image
                                        src="/logo/logo.png"
                                        alt="VoxiVerse"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        priority={true}
                                        style={{width: "200px", height: "auto"}}
                                    />
                                </a>
                                <h2 className="mt-6 text-xl font-extrabold text-noble-black-200">
                                    Sign in to your account
                                </h2>
                            </div>

                            <div className="mt-8">
                                <div className={styles.socialButtons}>
                                    {providers ? (
                                        Object.values(providers).map(provider => {
                                            if (provider.name === "Google") {
                                                return (
                                                    <button
                                                        key={provider.name}
                                                        className={styles.socialLoginButton}
                                                        onClick={() => signIn(provider.id)}
                                                    >
                                                        <Image
                                                            alt="Continue with Google"
                                                            src="/images/google.png"
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <div className={styles.socialText}>Sign in with Google</div>
                                                    </button>
                                                );
                                            } else if (provider.name === "Discord") {
                                                return (
                                                    <button
                                                        key={provider.name}
                                                        className={styles.socialLoginButton}
                                                        onClick={() => signIn(provider.id)}
                                                    >
                                                        <Image
                                                            alt="Continue with Discord"
                                                            src="/images/discord.png"
                                                            width={24}
                                                            height={24}
                                                        />
                                                        <div className={styles.socialText}>Sign in with Discord</div>
                                                    </button>
                                                );
                                            }
                                            return null;
                                        })
                                    ) : (
                                        <>
                                            <button className={styles.socialLoginButton}>
                                                <Image
                                                    alt="Continue with Google"
                                                    src="/images/google.png"
                                                    width={24}
                                                    height={24}
                                                />
                                                <div className={styles.socialText}>Sign in with Google</div>
                                            </button>
                                            <button className={styles.socialLoginButton}>
                                                <Image
                                                    alt="Continue with Discord"
                                                    src="/images/discord.png"
                                                    width={24}
                                                    height={24}
                                                />
                                                <div className={styles.socialText}>Sign in with Discord</div>
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div
                                    className="w-full relative flex flex-row items-center justify-start gap-[16px] text-left
                                 text-xs text-noble-black-400 font-body-s-medium mt-5"
                                >
                                    <div
                                        className="flex-1 relative box-border h-px border-t-[1px] border-solid
                                    border-noble-black-500"
                                    />
                                    <div className="relative tracking-[0.15px] leading-[18px] font-medium">
                                        or continue with email
                                    </div>
                                    <div
                                        className="flex-1 relative box-border h-px border-t-[1px] border-solid
                                    border-noble-black-500"
                                    />
                                </div>

                                <div className="mt-6">
                                    <form onSubmit={e => handleLogin(e)} className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="mt-1">
                                                <div style={{position: "relative"}}>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Email"
                                                        autoComplete="email"
                                                        required
                                                        className={
                                                            "appearance-none block w-full px-3 py-2 border " +
                                                            "border-noble-black-500 rounded-md shadow-sm " +
                                                            "placeholder-gray-400 focus:outline-none " +
                                                            "focus:ring-stem-green-600 focus:border-stem-green-600 " +
                                                            "sm:text-sm" +
                                                            (emailError ? " border-red-power-600" : "")
                                                        }
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                        style={{
                                                            backgroundColor: "#1a1d21",
                                                            color: "white",
                                                            paddingLeft: "35px",
                                                        }}
                                                    />
                                                    <Image
                                                        src="/icons/mail.svg"
                                                        alt="email"
                                                        style={{
                                                            position: "absolute",
                                                            left: "10px",
                                                            top: "50%",
                                                            transform: "translateY(-50%)",
                                                        }}
                                                        width={20}
                                                        height={20}
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-red-power-600 text-font-s">{emailError}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="mt-1">
                                                <div style={{position: "relative"}}>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder="Password"
                                                        autoComplete="current-password"
                                                        required
                                                        className={
                                                            "appearance-none block w-full px-3 py-2 border " +
                                                            "border-noble-black-500 rounded-md shadow-sm " +
                                                            "placeholder-gray-400 focus:outline-none " +
                                                            "focus:ring-stem-green-600 focus:border-stem-green-600 " +
                                                            "sm:text-sm" +
                                                            (passwordError ? " border-red-power-600" : "")
                                                        }
                                                        value={password}
                                                        onChange={e => setPassword(e.target.value)}
                                                        style={{
                                                            backgroundColor: "#1a1d21",
                                                            color: "white",
                                                            paddingLeft: "35px",
                                                        }}
                                                    />
                                                    <Image
                                                        src="/icons/padlock.svg"
                                                        alt="password"
                                                        style={{
                                                            position: "absolute",
                                                            left: "10px",
                                                            top: "50%",
                                                            transform: "translateY(-50%)",
                                                        }}
                                                        width={20}
                                                        height={20}
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-red-power-600 text-font-s">{passwordError}</div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-font-m">
                                                <a
                                                    href="/reset-password"
                                                    className="font-medium text-stem-green-500 hover:text-stem-green-700"
                                                >
                                                    Forgot password?
                                                </a>
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center py-2 px-4 border border-transparent
                                            rounded-md shadow-sm text-sm font-medium bg-stem-green-500
                                            hover:bg-stem-green-600 focus:outline-none focus:ring-2
                                            focus:ring-offset-2 focus:ring-indigo-500"
                                                style={{color: "black"}}
                                            >
                                                Log in
                                            </button>
                                            <br />
                                        </div>
                                    </form>
                                    <div className={styles.signUp}>
                                        <div className={styles.value}>Don’t have an account?</div>
                                        <a href="/register" className={styles.value1}>
                                            Sign Up
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block relative w-0 flex-1">
                        <Image
                            className="absolute inset-0 h-full w-full"
                            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaW
                        QiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                            alt="backdrop"
                            fill
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;
