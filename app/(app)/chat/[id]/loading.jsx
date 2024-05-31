import styles from "@/styles/Chat.module.css";
import styles2 from "@/styles/MessageInput.module.css";
import Image from "next/image";
import SidebarLoading from "@/components/Sidebar/SidebarLoading";

export const metadata = {
    title: "Chat",
};

const ChatLoading = () => {
    return (
        <>
            <div className="font-plus-jakarta-sans">
                <SidebarLoading />
                <div className="md:pl-[200px] flex flex-col flex-1">
                    <main>
                        <div className={styles.chat}>
                            <div className={styles.content}>
                                <div className={styles.characterInfo}>
                                    <div className={styles.heading}>
                                        <div className={styles.characterTitle}>
                                            <div className={styles.avatarIcon}></div>
                                            <div className={styles.projectName}>
                                                <b className={styles.orbitalOddysey}></b>
                                                <div className={styles.shortDescription}></div>
                                            </div>
                                        </div>
                                        <div className={styles.options}>
                                            <div className={styles.actions}>
                                                <button className={styles.editButton}>
                                                    <Image alt="Edit" src="/icons/pencil.svg" width={24} height={24} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.chatContent}>
                                    <div className={styles.middle}>
                                        <div className={styles.chat2}>
                                            <div className={styles.messages}></div>
                                        </div>
                                        <div className={styles2.messageInputContainer}>
                                            <div className={styles2.iconButton}>
                                                <div className={styles2.messageIcon}>
                                                    <Image alt="" src="/icons/microphone.svg" fill />
                                                </div>
                                            </div>
                                            <input
                                                className={styles2.messageInput}
                                                type="text"
                                                placeholder="Say something..."
                                                maxLength="true"
                                                minLength="true"
                                            />
                                            <div className={styles2.iconButton}>
                                                <div className={styles2.messageIcon}>
                                                    <Image alt="" src="/icons/attachment.svg" fill />
                                                </div>
                                            </div>
                                            <div className={styles2.sendButton}>
                                                <div className={styles2.messageIcon}>
                                                    <Image alt="" src="/icons/paperplane.svg" fill />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default ChatLoading;
