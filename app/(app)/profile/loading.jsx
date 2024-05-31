import styles from "../../../styles/Profile.module.css";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
import SidebarLoading from "@/components/Sidebar/SidebarLoading";

export const metadata = {
    title: "Your profile",
};

const ProfileLoading = () => {
    return (
        <>
            <SidebarLoading />
            <div className="md:pl-[200px] flex flex-col flex-1">
                <main className={styles.profile}>
                    <div className="space-y-4 md:min-w-[70%] m-auto md:p-5 min-w-full mt-0 mb-auto mx-auto">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden">
                                <Image src={"/icons/user.svg"} alt="Profile" height={150} width={150} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold"></h2>
                                <p className="text-noble-black-200">@</p>
                            </div>
                        </div>
                        <form>
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
                                        "bg-noble-black-600 text-noble-black-200"
                                    }
                                />
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
                                        "bg-noble-black-600 text-noble-black-200"
                                    }
                                />
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="block font-medium text-noble-black-0">
                                        Email
                                    </label>
                                </div>
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
                                <div className="p-1 space-y-1">
                                    <h3 className="text-lg font-semibold mb-2">Subscription Status</h3>
                                </div>
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
                    </div>
                    <Footer />
                </main>
            </div>
        </>
    );
};

export default ProfileLoading;
