import Image from "next/image";

export const metadata = {
    title: "Reset password",
};

const ResetLoading = () => {
    return (
        <>
            <main>
                <div className="min-h-full flex font-plus-jakarta-sans" style={{minHeight: "100vh"}}>
                    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
                        <div className="mx-auto w-full max-w-sm lg:w-96">
                            <div>
                                <a href="/">
                                    <Image
                                        width={200}
                                        height={200}
                                        src="/logo/logo.png"
                                        alt="VoxiVerse"
                                        priority={true}
                                    />
                                </a>
                                <h2 className="mt-6 text-xl font-extrabold text-noble-black-0">Account Recovery</h2>
                                <div className="mt-2 text-sm text-noble-black-200">
                                    <p className="font-medium">
                                        Enter your email address and we will send you instructions to reset your
                                        password.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <form className="space-y-6">
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

                                    <div>
                                        <button
                                            className="w-full flex justify-center py-2 px-4 border border-transparent
                                            rounded-md shadow-sm text-sm font-medium bg-stem-green-500
                                            hover:bg-stem-green-600 focus:outline-none focus:ring-2
                                            focus:ring-offset-2 focus:ring-indigo-500"
                                            style={{color: "black"}}
                                        >
                                            Continue
                                        </button>
                                        <br />
                                    </div>
                                </form>
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

export default ResetLoading;
