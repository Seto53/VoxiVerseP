"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import AlertDismissible from "@/components/AlertDismissible";
import Image from "next/image";

const ChangePassword = ({params}) => {
    const router = useRouter();

    const tokenString = params.tokenId;
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
        position: "tr",
    });
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordRepeatError, setPasswordRepeatError] = useState("");

    useEffect(() => {
        if (!tokenString) {
            router.push("/");
        }
        fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + `/api/token/${tokenString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })
            .then(response => {
                if (response.status === 404) {
                    router.push("/");
                    return;
                } else if (response.status === 429) {
                    setAlert({
                        open: true,
                        message: "Too many requests. Please try again later.",
                        severity: "error",
                        position: "tr",
                    });
                    return;
                }
                if (!response.ok) {
                    router.push("/");
                }
            })
            .catch(error => {
                console.error(error);
                setAlert({
                    open: true,
                    message: "Something went wrong. Please try again later.",
                    severity: "error",
                    position: "tr",
                });
            });
    }, [router, tokenString]);

    async function handleChangePassword(e) {
        e.preventDefault();

        if (password !== passwordRepeat) {
            setPasswordRepeatError("Passwords do not match");
            return;
        } else {
            setPasswordRepeatError("");
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return;
        } else {
            setPasswordError("");
        }

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + `/api/user/password/change`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        tokenString: tokenString,
                        newPassword: password,
                    },
                }),
                cache: "no-store",
            });

            if (response.ok) {
                router.push("/");
            } else if (response.status === 429) {
                setAlert({
                    open: true,
                    message: "Too many requests. Please try again later.",
                    severity: "error",
                    position: "tr",
                });
            } else {
                console.error(response);
                setAlert({
                    open: true,
                    message: "Something went wrong. Please try again later.",
                    severity: "error",
                    position: "tr",
                });
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
                                <h2 className="mt-6 text-xl font-extrabold text-noble-black-200">Password Reset</h2>
                                <div className="mt-2 text-sm text-noble-black-200">
                                    <p className="font-medium">
                                        Please type your new password. Make sure it is at least 8 characters long.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="mt-6">
                                    <form onSubmit={e => handleChangePassword(e)} className="space-y-6">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium
                                        text-noble-black-300"
                                            >
                                                Create password
                                            </label>
                                            <div className="mt-1" style={{position: "relative"}}>
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
                                                        autoComplete="current-password"
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

                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center py-2 px-4 border border-transparent
                                            rounded-md shadow-sm text-sm font-medium bg-stem-green-500
                                            hover:bg-stem-green-600 focus:outline-none focus:ring-2
                                            focus:ring-offset-2 focus:ring-indigo-500"
                                                style={{color: "black"}}
                                            >
                                                Save password
                                            </button>
                                            <br />
                                        </div>
                                    </form>
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

export default ChangePassword;
