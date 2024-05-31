"use client";

import styles from "@/styles/Chat.module.css";
import Messages from "@/components/Chat/Messages";
import MessageInput from "@/components/Chat/MessageInput";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import AlertDismissible from "@/components/AlertDismissible";
import {useSession} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import Dropdown from "@/components/Dropdown";
import {useSidebar} from "@/components/SidebarContext";
import ConfirmPopup from "@/components/ConfirmPopup";
import DisclamerCard from "@/components/Chat/DisclamerCard";

const Chat = ({id, characterName, characterImage, shortDescription}) => {
    const messageEndRef = useRef(null);
    const {data: session, status, update} = useSession();
    const {sidebarFolded} = useSidebar();
    const router = useRouter();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [disclaimerOpen, setDisclaimerOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
        position: "tr",
    });

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            if (messages.length === 0) {
                fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/character/greeting/" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    next: {
                        revalidate: 3600,
                    },
                })
                    .then(res => {
                        if (res.status === 429) {
                            setAlert({
                                open: true,
                                message: "Too many requests. Please try again later.",
                                severity: "error",
                                position: "tr",
                            });
                        }
                        return res.json();
                    })
                    .then(data => {
                        const greeting = data?.data.greeting;
                        setMessages([
                            {
                                sender: "Character",
                                textContent: greeting.textContent,
                                audioId: greeting.audioId,
                                createdAt: new Date(),
                            },
                        ]);
                    })
                    .catch(err => {
                        console.error(err);
                        setAlert({
                            open: true,
                            message: "Something went wrong. Please try again later.",
                            severity: "error",
                            position: "tr",
                        });
                    });
            }
        }
        if (status === "authenticated") {
            if (!session.user.username) {
                redirect("/create-username");
                return;
            }
            if (messages.length === 0) {
                fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        characterId: id,
                    }),
                    cache: "no-store",
                })
                    .then(res => {
                        if (res.status === 429) {
                            setAlert({
                                open: true,
                                message: "Too many requests. Please try again later.",
                                severity: "error",
                                position: "tr",
                            });
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data?.message === "Successfully created chat") {
                            setDisclaimerOpen(true);
                        }
                        const messages = data?.data.messages;
                        setMessages(messages);
                        setChatId(data?.data.chatId);
                    })
                    .catch(err => {
                        console.error(err);
                        setAlert({
                            open: true,
                            message: "Something went wrong. Please try again later.",
                            severity: "error",
                            position: "tr",
                        });
                    });
            }
        }
    }, [id, messages.length, session, status]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    const cancelTyping = () => {
        setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            newMessages.pop();
            return [...newMessages];
        });
    };

    const sendMessage = async message => {
        if (message.sender === "Character") {
            setMessages(prevMessages => {
                const newMessages = [...prevMessages];
                newMessages.pop();
                return [...newMessages, message];
            });
        } else if (message.sender === "User") {
            setMessages(prevMessages => [...prevMessages, message]);
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    sender: "Typing",
                },
            ]);
        } else {
            console.error("Invalid sender type: " + message.sender);
        }
        // TODO: Fix bugs with updating session
        await update();
    };

    function handleEditClick() {
        if (!dropdownOpen) {
            setDropdownOpen(true);
        } else {
            setDropdownOpen(false);
        }
    }

    async function deleteChat() {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/chat", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chatId: chatId,
                }),
                cache: "no-store",
            });
            if (res.ok) {
                setAlert({
                    open: true,
                    message: "Chat deleted, redirecting...",
                    severity: "success",
                    position: "tr",
                });
                setTimeout(() => {
                    router.push("/");
                }, 2000);
                return;
            }
            if (res.status === 429) {
                setAlert({
                    open: true,
                    message: "Too many requests. Please try again later.",
                    severity: "error",
                    position: "tr",
                });
                return;
            }
            console.error(res);
            setAlert({
                open: true,
                message: "Something went wrong. Please try again later.",
                severity: "error",
                position: "tr",
            });
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

    return (
        <>
            <Sidebar selected={"Chat"} />
            <div
                className={`${!sidebarFolded ? "md:pl-[200px]" : ""} transition-all duration-300 flex flex-col flex-1`}
            >
                <main>
                    <AlertDismissible
                        alertOpen={alert.open}
                        setAlert={setAlert}
                        message={alert.message}
                        severity={alert.severity}
                        position={alert.position}
                    />
                    <ConfirmPopup
                        open={confirmOpen}
                        setOpen={setConfirmOpen}
                        title={"Delete Chat?"}
                        content={"Are you sure you want to delete this chat?"}
                        action={"Delete"}
                        confirm={deleteChat}
                    />
                    <DisclamerCard open={disclaimerOpen} setOpen={setDisclaimerOpen} />
                    <div className={styles.chat}>
                        <div className={styles.content}>
                            <div className={styles.characterInfo}>
                                <div className={styles.heading}>
                                    <div className={styles.characterTitle}>
                                        <div className={styles.avatarIcon}>
                                            <Image
                                                alt={characterName}
                                                src={"/characters/" + characterImage}
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className={styles.projectName}>
                                            <b className={styles.orbitalOddysey}>{characterName}</b>
                                            <div className={styles.shortDescription}>{shortDescription}</div>
                                        </div>
                                    </div>
                                    {session && (
                                        <div className={styles.options}>
                                            <div className={styles.actions}>
                                                <div className={styles.dropdownWrapper}>
                                                    <button
                                                        className={styles.editButton}
                                                        onClick={() => {
                                                            handleEditClick();
                                                        }}
                                                    >
                                                        <Image
                                                            alt="Edit"
                                                            src="/icons/pencil.svg"
                                                            width={24}
                                                            height={24}
                                                        />
                                                    </button>
                                                    <Dropdown
                                                        dropdownOpen={dropdownOpen}
                                                        setDropdownOpen={setDropdownOpen}
                                                        handleDeleteChat={() => {
                                                            setConfirmOpen(true);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.chatContent}>
                                <div className={styles.middle}>
                                    <div className={styles.chat2}>
                                        <div className={styles.messages}>
                                            <Messages
                                                messages={messages}
                                                characterName={characterName}
                                                characterImage={characterImage}
                                                userName={session?.user?.name}
                                                userImage={session?.user?.image}
                                                setAlert={setAlert}
                                            />
                                            <div ref={messageEndRef} />
                                        </div>
                                    </div>
                                    <MessageInput
                                        sendMessage={sendMessage}
                                        cancelTyping={cancelTyping}
                                        characterId={id}
                                        setAlert={setAlert}
                                        session={session}
                                        status={status}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Chat;
