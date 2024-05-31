import styles from "./page.module.css";
import SidebarLoading from "@/components/Sidebar/SidebarLoading";

export const metadata = {
    title: "Continue chatting...",
};

const ChatHistoryLoading = () => {
    return (
        <>
            <SidebarLoading selected={"Chats"} />
            <div className="md:pl-[200px] flex flex-col flex-1">
                <main>
                    <div className={styles.chatHistory}>
                        <h1 className="text-xl mb-6 font-bold text-noble-black-0">Continue chatting...</h1>
                        <ul className="space-y-4"></ul>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ChatHistoryLoading;
