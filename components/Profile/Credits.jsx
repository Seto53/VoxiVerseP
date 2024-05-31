"use client";

import {useEffect, useState} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import getStripe from "@/utils/getStripe";

function calculateTimeUntilRefresh() {
    const now = new Date();
    const nextRefresh = new Date();
    nextRefresh.setUTCDate(now.getUTCDate() + (now.getUTCHours() >= 0 ? 1 : 0));
    nextRefresh.setUTCHours(0, 0, 0, 0); // Set to next day at 0:00 UTC
    return nextRefresh - now; // Time remaining in milliseconds
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
}

const Credits = ({session}) => {
    const [timeUntilRefresh, setTimeUntilRefresh] = useState(calculateTimeUntilRefresh());
    const [hasMounted, setHasMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const interval = setInterval(() => {
            setTimeUntilRefresh(calculateTimeUntilRefresh());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleOpen = () => setIsOpen(!isOpen);

    const renderRefreshTime = () => {
        if (
            hasMounted &&
            (session?.user?.stripe?.status === "active" || session?.user?.stripe?.status === "canceling")
        ) {
            return (
                <>
                    New credits in: <span className="font-bold">{formatTime(timeUntilRefresh)}</span>
                </>
            );
        }
        return null;
    };

    const handleRecharge = async () => {
        try {
            const res = await fetch("/api/stripe/checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "recharge",
                }),
                cache: "no-cache",
            });
            if (!res.ok) {
                console.error(res);
                return;
            }

            const checkoutSession = await res.json().then(data => {
                return data.data.session;
            });
            const stripe = await getStripe();
            const {error} = await stripe.redirectToCheckout({
                sessionId: checkoutSession.id,
            });
            if (error) {
                console.error(error);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div
                className={`mt-4 p-4 border border-noble-black-600 rounded-md  ${!isOpen && "cursor-pointer"}`}
                onClick={!isOpen ? toggleOpen : undefined}
            >
                <h3
                    className={`text-md font-semibold mb-2 flex justify-between items-center ${
                        isOpen && "cursor-pointer"
                    }`}
                    onClick={isOpen ? toggleOpen : undefined}
                >
                    Credits
                    {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </h3>
                <div
                    className={`transition-max-height duration-500 ease-in-out overflow-hidden 
            ${isOpen ? "max-h-96" : "max-h-0"}`}
                >
                    <div className="flex justify-between items-center mb-2">
                        <p>
                            Subscription Credits:{" "}
                            <span className="font-bold">{session?.user?.stripe?.subscriptionCredits}</span>
                        </p>
                        <p className="ml-2 text-sm">
                            {renderRefreshTime() && (
                                <>
                                    New credits in:
                                    <span className="font-bold">{formatTime(timeUntilRefresh)}</span>
                                </>
                            )}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p>
                            Recharge Credits:{" "}
                            <span className="font-bold">{session?.user?.stripe?.rechargeCredits}</span>
                        </p>
                        <button
                            onClick={() => handleRecharge().then()}
                            className=" py-2 px-4 rounded bg-electric-green-600/80
                                        hover:bg-electric-green-600 focus:outline-none focus:ring-2
                                        focus:ring-offset-2 focus:ring-electric-green-700 block text-center font-bold
                                        text-noble-black-0 text-font-l font transition duration-300 ease-in-out
                                        cursor-pointer"
                        >
                            Recharge
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Credits;
