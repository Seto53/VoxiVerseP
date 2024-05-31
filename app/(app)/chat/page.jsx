import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import Link from "next/link";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./page.module.css";
import Image from "next/image";

export const metadata = {
    title: "Continue chatting...",
};

const ChatHistoryPage = async () => {
    const cookieString = cookies().toString();

    const res = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/chat/history", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieString,
        },
        cache: "no-store",
    });

    if (res.status === 401) {
        return (
            <>
                <Sidebar selected={"Chats"} />
                <div className="md:pl-[200px] flex flex-col flex-1">
                    <main>
                        <div className={styles.chatHistory}>
                            <ul className="space-y-4">
                                <li>
                                    <Link href={"/login"} className="flex items-center space-x-4">
                                        <div>
                                            <h2 className="text-lg font-semibold text-noble-black-0">
                                                You are not logged in
                                            </h2>
                                            <p className="text-font-m text-noble-black-200 underline">
                                                Please login to see your chat history
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </main>
                </div>
            </>
        );
    }
    if (!res.ok) return redirect("/");

    const characters = (await res.json()).data;

    return (
        <>
            <Sidebar selected={"Chats"} />
            <div className="md:pl-[200px] flex flex-col flex-1 transition-all duration-300">
                <main>
                    <div className={styles.chatHistory}>
                        <h1 className="text-xl mb-6 font-bold text-noble-black-0">Continue chatting...</h1>
                        <ul className="space-y-6">
                            {characters.map(character => (
                                <li key={character.id}>
                                    <Link href={"/chat/" + character.id} className="flex items-center space-x-4">
                                        <Image
                                            width={150}
                                            height={150}
                                            src={`/characters/${character.image}`}
                                            alt={character.name}
                                            className="rounded-md shadow-lg"
                                        />
                                        <div>
                                            <h2 className="text-lg font-semibold text-noble-black-0">
                                                {character.name}
                                            </h2>
                                            <p className="text-font-m text-noble-black-200">
                                                {character.shortDescription}
                                            </p>
                                            <p className="text-font-m text-noble-black-300 350px sm:w-[350px] lg:w-[500px]">
                                                &quot;{character.latestMessage}&quot;
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ChatHistoryPage;
