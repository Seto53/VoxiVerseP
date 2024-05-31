"use client";

import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import {useEffect, useState} from "react";
import styled from "@mui/material/styles/styled";

const AlertPositionDiv = styled("div")(({position}) => {
    return {
        position: "fixed",
        top: position.includes("t") ? "75px" : "auto",
        bottom: position.includes("b") ? "75px" : "auto",
        left: position.includes("l") ? "50px" : "auto",
        right: position.includes("r") ? "50px" : "auto",
        zIndex: 1000,
        width: "250px",
    };
});

const getPosition = pos => {
    if (pos.includes("r")) return "left";
    return "right";
};

const AlertDismissible = ({message, alertOpen, setAlert, severity, position}) => {
    const [slideDirection, setSlideDirection] = useState(getPosition(position));

    useEffect(() => {
        setSlideDirection(getPosition(position));
    }, [position]);

    useEffect(() => {
        let duration = 5000;
        if (severity === "info") {
            duration = 3000;
        } else if (severity === "error") {
            duration = 10000;
        }
        const timer = setTimeout(() => {
            setAlert(prevState => ({
                ...prevState,
                open: false,
            }));
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [alertOpen, severity, setAlert]);

    return (
        <>
            <Slide in={alertOpen} direction={slideDirection} {...(alertOpen ? {timeout: 300} : {})}>
                <AlertPositionDiv position={position}>
                    <Alert
                        onClose={() => {
                            setAlert(prevState => ({
                                ...prevState,
                                open: false,
                            }));
                        }}
                        sx={{
                            fontFamily: "var(--font-plus-jakarta-sans)",
                            borderRadius: "var(--br-8)",
                        }}
                        severity={severity}
                    >
                        {message}
                    </Alert>
                </AlertPositionDiv>
            </Slide>
        </>
    );
};

export default AlertDismissible;
