"use client";

import styles from "@/styles/Messages.module.css";
import {useCallback, useEffect, useState} from "react";

const AudioMessage = ({audioId, autoPlay, setAlert}) => {
    const [audioUrl, setAudioUrl] = useState();

    const fetchAudio = useCallback(() => {
        if (!audioUrl) {
            fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/chat/message/audio/" + audioId, {
                method: "GET",
            })
                .then(res => res.blob())
                .then(blob => {
                    setAudioUrl(URL.createObjectURL(blob));
                })
                .catch(err => {
                    console.error(err);
                    setAlert({
                        open: true,
                        message: "Error fetching audio. Please try again later.",
                        severity: "error",
                        position: "tr",
                    });
                });
        }
    }, [audioUrl, setAlert, audioId]);

    useEffect(() => {
        if (!audioUrl) {
            fetchAudio();
        }
    }, [audioUrl, fetchAudio]);

    return (
        <>
            <audio
                controls
                autoPlay={autoPlay}
                controlsList="noplaybackrate"
                className={styles.audioPlayer}
                onPlay={fetchAudio}
            >
                {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
            </audio>
        </>
    );
};

export default AudioMessage;
