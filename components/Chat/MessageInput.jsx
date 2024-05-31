"use client";

import styles from "@/styles/MessageInput.module.css";
import {useEffect, useState} from "react";
import Image from "next/image";
import "regenerator-runtime/runtime";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import LoginCard from "@/components/LoginCard";
import {useSidebar} from "@/components/SidebarContext";
import RechargeCard from "@/components/RechargeCard";

const MessageInput = ({sendMessage, cancelTyping, characterId, setAlert, session, status}) => {
    const [message, setMessage] = useState("");
    const [responding, setResponding] = useState(false);
    const [loginCardOpen, setLoginCardOpen] = useState(false);
    const [rechargeCardOpen, setRechargeCardOpen] = useState(false);

    const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();
    const {setSubscriptionOpen} = useSidebar();

    useEffect(() => {
        setMessage(transcript);
    }, [transcript]);

    async function handleSendMessage() {
        try {
            if (status === "loading") return;
            if (status === "unauthenticated") {
                setLoginCardOpen(true);
                return;
            }
            if (session.user.stripe.rechargeCredits === 0) {
                if (
                    session.user.stripe.status.toString() !== "active" &&
                    session.user.stripe.status.toString() !== "canceling"
                ) {
                    setSubscriptionOpen(true);
                    return;
                }
            }
            if (responding || listening) {
                return;
            }
            setResponding(true);
            if (message.length > 0 || transcript.length > 0) {
                const content = message.length > 0 ? message : transcript;

                let canSend = false;
                if (session.user.stripe.subscriptionCredits > 0) {
                    if (
                        session.user.stripe.status.toString() === "active" ||
                        session.user.stripe.status.toString() === "canceling"
                    ) {
                        canSend = true;
                    }
                }
                if (session.user.stripe.rechargeCredits > 0) {
                    canSend = true;
                }

                if (!canSend) {
                    if (
                        session.user.stripe.status.toString() === "active" ||
                        session.user.stripe.status.toString() === "canceling"
                    ) {
                        setRechargeCardOpen(true);
                    } else {
                        setAlert({
                            open: true,
                            message: "Please subscribe or top up your account.",
                            severity: "error",
                            position: "tr",
                        });
                    }
                    setResponding(false);
                    return;
                }

                await sendMessage({
                    textContent: content,
                    createdAt: new Date().toISOString(),
                    sender: "User",
                });

                setMessage("");
                resetTranscript();
                const res = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/chat/message", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: {
                            message: content,
                            characterId: characterId,
                        },
                    }),
                    cache: "no-store",
                });

                if (res.status === 403) {
                    const data = await res.json();
                    if (data.message === "Insufficient credits") {
                        cancelTyping();
                        setAlert({
                            open: true,
                            message: "Insufficient credits. Please subscribe or top up your account.",
                            severity: "error",
                            position: "tr",
                        });
                    }
                    setResponding(false);
                    return;
                } else if (res.status === 429) {
                    setAlert({
                        open: true,
                        message: "Too many requests. Please try again later.",
                        severity: "error",
                        position: "tr",
                    });
                    setResponding(false);
                    return;
                }
                if (!res.ok) {
                    console.error(res);
                    setAlert({
                        open: true,
                        message: "Error sending message. Please try again later.",
                        severity: "error",
                        position: "tr",
                    });
                    setResponding(false);
                    return;
                }
                const data = await res.json();

                const {textResponse, audioId} = data.data;

                await sendMessage({
                    textContent: textResponse,
                    audioId: audioId,
                    createdAt: new Date().toISOString(),
                    sender: "Character",
                });
            }
            setResponding(false);
        } catch (e) {
            setResponding(false);
            console.error(e);
            setAlert({
                open: true,
                message: "Error sending message. Please try again later.",
                severity: "error",
                position: "tr",
            });
        }
    }

    return (
        <div className={styles.messageInputContainer}>
            <LoginCard open={loginCardOpen} setOpen={setLoginCardOpen} />
            <RechargeCard open={rechargeCardOpen} setOpen={setRechargeCardOpen} />
            {listening ? (
                <div
                    className={styles.iconButton}
                    onClick={SpeechRecognition.stopListening}
                    style={{
                        padding: "9px",
                    }}
                >
                    <div
                        className={styles.messageIcon}
                        style={{
                            width: "30px",
                            height: "30px",
                        }}
                    >
                        <Image alt="" src="/icons/stopcircle.svg" fill />
                    </div>
                </div>
            ) : (
                <div className={styles.iconButton} onClick={SpeechRecognition.startListening}>
                    <div className={styles.messageIcon}>
                        <Image alt="" src="/icons/microphone.svg" fill />
                    </div>
                </div>
            )}
            <input
                className={styles.messageInput}
                type="text"
                placeholder="Say something..."
                maxLength="1000"
                minLength="1"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        if (!responding && !listening) {
                            e.preventDefault();
                            handleSendMessage().then();
                        }
                    }
                }}
            />
            {/*<div className={styles.iconButton}>*/}
            {/*    <div className={styles.messageIcon}>*/}
            {/*        <Image*/}
            {/*            alt=""*/}
            {/*            src="/icons/attachment.svg"*/}
            {/*            fill*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div
                className={styles.sendButton}
                style={{
                    cursor: message.length > 0 && !responding ? "pointer" : "default",
                    backgroundColor:
                        message.length > 0 && !responding ? "var(--noble-black-600)" : "var(--noble-black-800)",
                }}
                onClick={() => {
                    if (!responding && !listening) {
                        handleSendMessage().then();
                    }
                }}
            >
                <div className={styles.messageIcon}>
                    <Image alt="" src="/icons/paperplane.svg" fill />
                </div>
            </div>
        </div>
    );
};

export default MessageInput;
