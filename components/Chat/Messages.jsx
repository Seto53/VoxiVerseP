import styles from "../../styles/Messages.module.css";
import Image from "next/image";
import AudioMessage from "@/components/Chat/AudioMessage";
import Typing from "@/components/Chat/Typing";

const Message = ({
    textContent,
    sender,
    sentAt,
    characterName,
    characterImage,
    audioId,
    autoPlay,
    userName,
    userImage,
    setAlert,
}) => {
    function convertDate(date) {
        const localDate = new Date(date);
        const now = new Date();
        if (localDate.toDateString() === now.toDateString()) {
            return localDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
        }
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        if (localDate.toDateString() === yesterday.toDateString()) {
            return `Yesterday at ${localDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}`;
        }
        if (localDate.getFullYear() === now.getFullYear()) {
            return localDate.toLocaleDateString([], {month: "long", day: "numeric"});
        }
        return localDate.toLocaleDateString([], {month: "long", day: "numeric", year: "numeric"});
    }

    function copyText() {
        navigator.clipboard.writeText(textContent).then(() => {
            setAlert({
                open: true,
                message: "Copied to clipboard!",
                severity: "info",
                position: "tr",
            });
        });
    }

    if (sender === "Typing") {
        return (
            <div className={styles.message}>
                <div className={styles.avatarIcon}>
                    <Image alt="" src={"/characters/" + characterImage} width={50} height={50} />
                </div>
                <div className={styles.content2}>
                    <div className={styles.messsage}>
                        <div className={styles.name2}>
                            <div className={styles.user}>
                                <div className={styles.intellisys}>{characterName}</div>
                            </div>
                        </div>
                        <div className={styles.wellWeDefinitelyContainer}>
                            <span className={styles.wellWeDefinitely}>
                                <Typing />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.message}>
            <div className={styles.avatarIcon}>
                <Image
                    alt=""
                    src={
                        sender === "Character"
                            ? "/characters/" + characterImage
                            : userImage
                                ? userImage
                                : "/icons/user.svg"
                    }
                    width={50}
                    height={50}
                />
            </div>
            <div className={styles.content2}>
                <div className={styles.messsage}>
                    <div className={styles.name2}>
                        <div className={styles.user}>
                            <div className={styles.intellisys}>{sender === "Character" ? characterName : userName}</div>
                            <div className={styles.minAgo}>{convertDate(sentAt)}</div>
                        </div>
                        <div className={styles.buttonIcon3}>
                            <div className={styles.messageButtonBox} onClick={copyText}>
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        className={styles.messageButton}
                                        d="M11.6665 5.99996H11.9998C12.7362 5.99996 13.3332 6.59691 13.3332
                                            7.33329V12C13.3332 12.7363 12.7362 13.3333 11.9998 13.3333H7.33317C6.59679
                                            13.3333 5.99984 12.7363 5.99984 12V11.6666M3.99984 9.99996H8.6665C9.40288
                                            9.99996 9.99984 9.40301 9.99984 8.66663V3.99996C9.99984 3.26358 9.40288
                                            2.66663 8.6665 2.66663H3.99984C3.26346 2.66663 2.6665 3.26358 2.6665
                                            3.99996V8.66663C2.6665 9.40301 3.26346 9.99996 3.99984 9.99996Z"
                                        stroke="#686b6e"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            {/*{sender === 'Character' && (*/}
                            {/*    <>*/}
                            {/*        <div className={styles.messageButtonBox}>*/}
                            {/*            <svg stroke="#686b6e" fill="none" strokeWidth="2" viewBox="0 0 24 24"*/}
                            {/*                 strokeLinecap="round"*/}
                            {/*                 strokeLinejoin="round" className="icon-sm" height="1em" width="1em"*/}
                            {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                            {/*                <path*/}
                            {/*                    className={styles.messageButton}*/}
                            {/*                    d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0*/}
                            {/*                    0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>*/}
                            {/*            </svg>*/}
                            {/*        </div>*/}
                            {/*        <div className={styles.messageButtonBox}>*/}
                            {/*            <svg stroke="#686b6e" fill="none" strokeWidth="2" viewBox="0 0 24 24"*/}
                            {/*                 strokeLinecap="round"*/}
                            {/*                 strokeLinejoin="round" className="icon-sm" height="1em" width="1em"*/}
                            {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                            {/*                <path*/}
                            {/*                    className={styles.messageButton}*/}
                            {/*                    d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2*/}
                            {/*                2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>*/}
                            {/*            </svg>*/}
                            {/*        </div>*/}
                            {/*    </>*/}
                            {/*)}*/}
                        </div>
                    </div>
                    <div className={styles.wellWeDefinitelyContainer}>
                        <span className={styles.wellWeDefinitely}>{textContent}</span>
                    </div>
                </div>
                {/*{chat.images && (*/}
                {/*    <div className={styles.imageParent}>*/}
                {/*        {chat.images.map((image, index) => (*/}
                {/*            <div key={index} className={styles.imageWrapper}>*/}
                {/*                <Image*/}
                {/*                    src={image}*/}
                {/*                    alt=""*/}
                {/*                    fill*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*)}*/}
                {sender === "Character" && (
                    <div className={styles.messageOptions}>
                        <AudioMessage audioId={audioId} autoPlay={autoPlay} setAlert={setAlert} />
                        {/*<div className={styles.actions}>*/}
                        {/*    <div className={styles.button2}>*/}
                        {/*        <div className={styles.projects}>*/}
                        {/*            Regenerate response*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                )}
            </div>
        </div>
    );
};

const Messages = ({messages, characterName, characterImage, userName, userImage, setAlert}) => {
    return (
        <>
            {messages.map((message, index) => (
                <Message
                    key={index}
                    textContent={message.textContent}
                    sender={message.sender}
                    sentAt={message.createdAt}
                    characterName={characterName}
                    characterImage={characterImage}
                    audioId={message?.audioId}
                    autoPlay={messages.length === index + 1}
                    userName={userName}
                    userImage={userImage}
                    setAlert={setAlert}
                />
            ))}
            <div className={styles.gradientTop} />
        </>
    );
};

export default Messages;
