"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import styles from "../styles/Profile.module.css";
import Link from "next/link";
import Footer from "@/components/Footer";
import AlertDismissible from "@/components/AlertDismissible";
import SubscriptionStatus from "@/components/Profile/SubscriptionStatus";
import {NAME_REGEX, USERNAME_REGEX} from "@/constants";
import Credits from "@/components/Profile/Credits";
import {useSidebar} from "@/components/SidebarContext";
import Image from "next/image";

const Profile = () => {
    const {data: session, status: status} = useSession();
    const {sidebarFolded} = useSidebar();

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
        position: "tr",
    });
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [nameError, setNameError] = useState("");

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            redirect("/login");
            return;
        }
        if (status === "authenticated") {
            if (!session.user.username) {
                redirect("/create-username");
                return;
            }
            setUsername(session.user.username);
            setName(session.user.name);
            setImage(session.user.image);
        }
    }, [session, status]);

    const handleUpdateProfile = useCallback(
        async e => {
            e.preventDefault();

            let isValid = true;
            setAlert(prevState => ({
                ...prevState,
                open: false,
            }));

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

            if (!NAME_REGEX.test(name)) {
                setNameError(
                    "Name must be 1-15 characters long and can only contain letters, numbers, dots, " +
                        "underscores and dashes."
                );
                isValid = false;
            } else {
                setNameError("");
            }

            if (isValid) {
                try {
                    const res = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/user/info/update", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            data: {
                                username: username,
                                name: name,
                            },
                        }),
                        cache: "no-store",
                    });

                    if (res.ok) {
                        setAlert({
                            open: true,
                            message: "Profile updated successfully.",
                            severity: "success",
                            position: "tr",
                        });
                    } else if (res.status === 409) {
                        setUsernameError("Username is taken.");
                    } else if (res.status === 429) {
                        setAlert({
                            open: true,
                            message: "Too many requests. Please try again later.",
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
        [username, name]
    );

    return (
        <>
            <Sidebar />
            <div
                className={`${!sidebarFolded ? "md:pl-[200px]" : ""} flex flex-col flex-1 transition-all duration-300`}
            >
                <main className={styles.profile}>
                    <AlertDismissible
                        alertOpen={alert.open}
                        setAlert={setAlert}
                        message={alert.message}
                        severity={alert.severity}
                        position={alert.position}
                    />
                    <div className="space-y-4 md:min-w-[70%] m-auto md:p-5 min-w-full mt-0 mb-auto mx-auto">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden">
                                <Image src={image || "/icons/user.svg"} alt="Profile" height={150} width={150} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">{name}</h2>
                                <p className="text-noble-black-200">@{username}</p>
                            </div>
                        </div>
                        <form onSubmit={e => handleUpdateProfile(e)}>
                            <div className="space-y-3">
                                <div className="space-y-1.5">
                                    <label htmlFor="username" className="block font-medium text-noble-black-0">
                                        Username
                                    </label>
                                    <div>
                                        <p className="text-font-m text-noble-black-300">
                                            You can change your username at any time.
                                        </p>
                                    </div>
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    autoComplete="off"
                                    required
                                    className={
                                        "appearance-none block w-full px-3 py-2 border border-noble-black-500 " +
                                        "rounded-md shadow-sm placeholder-gray-400 focus:outline-none " +
                                        "focus:ring-stem-green-600 focus:border-stem-green-600 " +
                                        "bg-noble-black-600 text-noble-black-200" +
                                        (usernameError ? " border-red-power-600" : "")
                                    }
                                    value={username}
                                    onChange={e => {
                                        setUsername(e.target.value);
                                        setAlert(prevState => ({
                                            ...prevState,
                                            open: false,
                                        }));
                                    }}
                                />
                                <div className="text-red-power-600 text-font-s">{usernameError}</div>
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="block font-medium text-noble-black-0">
                                        Name
                                    </label>
                                    <div>
                                        <p className="text-font-m text-noble-black-300">How you appear in chats.</p>
                                    </div>
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    autoComplete="name"
                                    required
                                    className={
                                        "appearance-none block w-full px-3 py-2 border border-noble-black-500 " +
                                        "rounded-md shadow-sm placeholder-gray-400 focus:outline-none " +
                                        "focus:ring-stem-green-600 focus:border-stem-green-600 " +
                                        "bg-noble-black-600 text-noble-black-200 " +
                                        (nameError ? " border-red-power-600" : "")
                                    }
                                    value={name}
                                    onChange={e => {
                                        setName(e.target.value);
                                        setAlert(prevState => ({
                                            ...prevState,
                                            open: false,
                                        }));
                                    }}
                                />
                                <div className="text-red-power-600 text-font-s">{nameError}</div>
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="block font-medium text-noble-black-0">
                                        Email
                                    </label>
                                </div>
                                {status === "authenticated" ? (
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        autoComplete="email"
                                        required
                                        disabled
                                        className={
                                            "appearance-none block w-full px-3 py-2 border border-noble-black-500 " +
                                            "rounded-md shadow-sm placeholder-gray-400 focus:outline-none " +
                                            "focus:ring-stem-green-600 focus:border-stem-green-600 " +
                                            "bg-noble-black-600 text-noble-black-300"
                                        }
                                        value={session?.user?.email}
                                    />
                                ) : (
                                    <>
                                        <input
                                            id="email"
                                            name="email"
                                            type="text"
                                            placeholder="Email"
                                            autoComplete="email"
                                            required
                                            disabled
                                            className={
                                                "appearance-none block w-full px-3 py-2 border border-noble-black-500 " +
                                                "rounded-md shadow-sm placeholder-gray-400 focus:outline-none " +
                                                "focus:ring-stem-green-600 focus:border-stem-green-600 " +
                                                "bg-noble-black-600 text-noble-black-300"
                                            }
                                        />
                                    </>
                                )}
                                <SubscriptionStatus status={session?.user?.stripe?.status} />
                                <div className="flex justify-center space-x-4 items-center mt-4">
                                    <Link href={"/reset-password"}>
                                        <div className="text-stem-green-500 hover:underline">Reset Password</div>
                                    </Link>
                                    <button
                                        type="submit"
                                        className="py-2 px-4 border border-transparent rounded-md shadow-sm
                                    font-medium bg-stem-green-500 hover:bg-stem-green-600 focus:outline-none
                                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        style={{color: "black"}}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                        <Credits session={session} />
                    </div>
                    <Footer />
                </main>
            </div>
        </>
    );
};

export default Profile;
