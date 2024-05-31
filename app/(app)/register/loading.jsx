import styles from "../../../styles/Register.module.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "Create your VoxiVerse account",
};

const RegisterLoading = () => {
    return (
        <>
            <main>
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
                                    <form className="space-y-4">
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
                                                            "sm:text-sm"
                                                        }
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
                                                            "sm:text-sm"
                                                        }
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
                                                            "sm:text-sm"
                                                        }
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
                                                            "sm:text-sm"
                                                        }
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
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    id="terms-and-conditions"
                                                    name="terms-and-conditions"
                                                    type="checkbox"
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300
                                                 rounded"
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
                                        <div>
                                            <button
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

export default RegisterLoading;
