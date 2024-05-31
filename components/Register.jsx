"use client";

import styles from "../styles/Register.module.css";
import {useCallback, useEffect, useState} from "react";
import {getProviders, signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import Link from "next/link";
import AlertDismissible from "@/components/AlertDismissible";
import {EMAIL_REGEX, USERNAME_REGEX} from "@/constants";
import Image from "next/image";

const Register = () => {
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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordRepeatError, setPasswordRepeatError] = useState("");
    const [termsError, setTermsError] = useState("");

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

    const handleRegister = useCallback(
        async e => {
            e.preventDefault();

            if (!executeRecaptcha) {
                setAlert({
                    open: true,
                    message: "reCAPTCHA error. Please try again later.",
                    severity: "error",
                    position: "tr",
                });
            }

            let isValid = true;

            if (!EMAIL_REGEX.test(email)) {
                setEmailError("The email you entered is invalid");
                isValid = false;
            } else {
                setEmailError("");
            }

            if (username.length < 4) {
                setUsernameError("Username is too short");
                isValid = false;
            } else if (username.length > 15) {
                setUsernameError("Username is too long");
                isValid = false;
            } else if (!USERNAME_REGEX.test(username)) {
                setUsernameError(
                    "Username must be between 4 and 15 characters and contain only letters, numbers, " +
                        "periods, underscores, and hyphens"
                );
                isValid = false;
            } else {
                setUsernameError("");
            }

            if (password.length < 8) {
                setPasswordError("Password must be at least 8 characters");
                isValid = false;
            } else {
                setPasswordError("");
            }

            if (password !== passwordRepeat) {
                setPasswordRepeatError("Passwords do not match");
                isValid = false;
            } else {
                setPasswordRepeatError("");
            }

            // Validate terms and conditions using state
            if (!termsAccepted) {
                setTermsError("You must accept the Terms and Conditions");
                isValid = false;
            } else {
                setTermsError("");
            }

            if (isValid) {
                let token = await executeRecaptcha("register");

                try {
                    const response = await fetch("/api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            data: {
                                email: email,
                                username: username,
                                password: password,
                            },
                            token: token,
                        }),
                        cache: "no-store",
                    });

                    if (response.status === 201) {
                        token = await executeRecaptcha("login");
                        await signIn("credentials", {
                            email: email,
                            password: password,
                            token: token,
                            callbackUrl: "/",
                        });
                    } else if (response.status === 429) {
                        setAlert({
                            open: true,
                            message: "Too many requests. Please try again later.",
                            severity: "error",
                            position: "tr",
                        });
                    } else if (!response.ok) {
                        const data = await response.json();
                        if (data.message === "Email already exists") {
                            setEmailError("Please sign in with your existing account");
                        }
                        if (data.message === "Username already exists") {
                            setUsernameError("Username already exists");
                        }
                    }
                } catch (e) {
                    console.error(e);
                    setAlert({
                        open: true,
                        message: "Something went wrong. Please try again later.",
                        severity: "error",
                        position: "tr",
                    });
                }
            }
        },
        [executeRecaptcha, email, username, password, passwordRepeat, termsAccepted]
    );

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
                                    <Image width={200} height={200} src="/logo/logo.png" alt="VoxiVerse" />
                                </a>
                                <h2 className="mt-6 text-xl font-extrabold text-noble-black-200">
                                    Create your account
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
                                                        <div className={styles.socialText}>Continue with Google</div>
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
                                                        <div className={styles.socialText}>Continue with Discord</div>
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
                                                <div className={styles.socialText}>Continue with Google</div>
                                            </button>
                                            <button className={styles.socialLoginButton}>
                                                <Image
                                                    alt="Continue with Discord"
                                                    src="/images/discord.png"
                                                    width={24}
                                                    height={24}
                                                />
                                                <div className={styles.socialText}>Continue with Discord</div>
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div
                                    className="w-full relative flex flex-row items-center justify-start gap-[16px] text-left
                                 text-xs text-noble-black-400 font-body-s-medium mt-6"
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
                                    <form onSubmit={e => handleRegister(e)} className="space-y-4">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium
                                        text-noble-black-300"
                                            >
                                                Email
                                            </label>
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
                                            <label
                                                htmlFor="username"
                                                className="block text-sm font-medium
                                        text-noble-black-300"
                                            >
                                                Username
                                            </label>
                                            <div className="mt-1">
                                                <div style={{position: "relative"}}>
                                                    <input
                                                        id="username"
                                                        name="username"
                                                        type="username"
                                                        placeholder="Username"
                                                        autoComplete="off"
                                                        required
                                                        className={
                                                            "appearance-none block w-full px-3 py-2 border " +
                                                            "border-noble-black-500 rounded-md shadow-sm " +
                                                            "placeholder-gray-400 focus:outline-none " +
                                                            "focus:ring-stem-green-600 focus:border-stem-green-600 " +
                                                            "sm:text-sm" +
                                                            (usernameError ? " border-red-power-600" : "")
                                                        }
                                                        value={username}
                                                        onChange={e => setUsername(e.target.value)}
                                                        style={{
                                                            backgroundColor: "#1a1d21",
                                                            color: "white",
                                                            paddingLeft: "35px",
                                                        }}
                                                    />
                                                    <Image
                                                        src="/icons/user.svg"
                                                        alt="username"
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
                                            <div className="text-red-power-600 text-font-s">{usernameError}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium
                                        text-noble-black-300"
                                            >
                                                Password
                                            </label>
                                            <div className="mt-1">
                                                <div style={{position: "relative"}}>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder="Password"
                                                        autoComplete="new-password"
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
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium
                                        text-noble-black-300"
                                            >
                                                Repeat Password
                                            </label>
                                            <div className="mt-1">
                                                <div style={{position: "relative"}}>
                                                    <input
                                                        id="password-repeat"
                                                        name="password-repeat"
                                                        type="password"
                                                        placeholder="Repeat Password"
                                                        autoComplete="new-password"
                                                        required
                                                        className={
                                                            "appearance-none block w-full px-3 py-2 border " +
                                                            "border-noble-black-500 rounded-md shadow-sm " +
                                                            "placeholder-gray-400 focus:outline-none " +
                                                            "focus:ring-stem-green-600 focus:border-stem-green-600 " +
                                                            "sm:text-sm" +
                                                            (passwordRepeatError ? " border-red-power-600" : "")
                                                        }
                                                        value={passwordRepeat}
                                                        onChange={e => setPasswordRepeat(e.target.value)}
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
                                            <div className="text-red-power-600 text-font-s">{passwordRepeatError}</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    id="terms-and-conditions"
                                                    name="terms-and-conditions"
                                                    type="checkbox"
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300
                                                 rounded"
                                                    checked={termsAccepted}
                                                    onChange={() => setTermsAccepted(!termsAccepted)}
                                                />
                                                <label
                                                    htmlFor="remember-me"
                                                    className="ml-2 block text-sm
                                            text-noble-black-300"
                                                >
                                                    I agree to the{" "}
                                                    <Link
                                                        href="/terms"
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        className="underline"
                                                    >
                                                        Terms & Conditions
                                                    </Link>{" "}
                                                    and{" "}
                                                    <Link
                                                        href="/privacy"
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        className="underline"
                                                    >
                                                        Privacy Policy
                                                    </Link>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="text-red-power-600 text-font-s">{termsError}</div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center py-2 px-4 border border-transparent
                                            rounded-md shadow-sm text-sm font-medium bg-stem-green-500
                                            hover:bg-stem-green-600 focus:outline-none focus:ring-2
                                            focus:ring-offset-2 focus:ring-indigo-500"
                                                style={{color: "black"}}
                                            >
                                                Create Account
                                            </button>
                                            <br />
                                        </div>
                                    </form>
                                    <div className={styles.signUp}>
                                        <div className={styles.value}>Already have an account?</div>
                                        <a href="/login" className={styles.value1}>
                                            Log in
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

export default Register;
