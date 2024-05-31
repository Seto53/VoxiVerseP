"use client";

import {Transition} from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import {useRef} from "react";
import getStripe from "@/utils/getStripe";
import Image from "next/image";

const SubscriptionCard = ({open, setOpen}) => {
    const nodeRef = useRef(null);

    const pricing = [
        {
            title: "Become a Member",
            price: 15,
            frequency: "/month",
            description: "Begin Your Adventure!",
            features: ["20 message credits per day", "Access to all characters", "Extendable credit limit"],
            cta: "Subscribe",
        },
    ];

    const handleCreateSubscription = async () => {
        try {
            const res = await fetch("/api/stripe/checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "subscription",
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
        <Transition in={open} timeout={400} nodeRef={nodeRef}>
            {state => (
                <div
                    ref={nodeRef}
                    style={{
                        display: ["entering", "entered"].includes(state) ? "block" : "none",
                    }}
                >
                    <Modal
                        keepMounted
                        open={!["exited", "exiting"].includes(state)}
                        onClose={() => setOpen(false)}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: "none",
                                    transition: `opacity 400ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: {opacity: 1, backdropFilter: "blur(8px)"},
                                        entered: {opacity: 1, backdropFilter: "blur(8px)"},
                                        exiting: {opacity: 0, backdropFilter: "none"},
                                    }[state],
                                },
                            },
                        }}
                    >
                        <ModalDialog
                            sx={{
                                opacity: 0,
                                transition: `opacity 300ms`,
                                ...{
                                    entering: {opacity: 1},
                                    entered: {opacity: 1},
                                    exiting: {opacity: 0},
                                }[state],
                                backgroundColor: "var(--noble-black-600)",
                                borderColor: "var(--noble-black-700)",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <DialogContent>
                                <div
                                    className="relative mx-auto w-[78vw] sm:w-[550px] lg:w-[550px] xl:w-[550px]
                                font-plus-jakarta-sans rounded-2xl text-noble-black-0 p-1 bg-noble-black-600"
                                >
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="absolute top-1 right-1 p-1 rounded-full hover:bg-noble-black-700
                                        transition duration-300"
                                    >
                                        <Image src={"/icons/cross.svg"} alt={"Close"} width={24} height={24} />
                                    </button>
                                    <h2 className="text-2xl font-bold tracking-tight mb-4">VoxiVerse Membership</h2>
                                    <div className="mt-2 space-y-8 lg:gap-x-8 lg:space-y-0">
                                        {pricing.map(tier => (
                                            <div
                                                key={tier.title}
                                                className="relative flex flex-col justify-between rounded-2xl
                                                    border border-noble-black-700/70 p-6 shadow-md"
                                            >
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold mb-4">{tier.title}</h3>
                                                    <p className="mt-2 flex items-baseline">
                                                        <span
                                                            className="text-3xl font-bold tracking-tight
                                                            text-noble-black-200"
                                                        >
                                                            ${tier.price}
                                                        </span>
                                                        <span
                                                            className="ml-1 text-l font-semibold
                                                            text-noble-black-200"
                                                        >
                                                            {tier.frequency}
                                                        </span>
                                                    </p>
                                                    <p className="mt-4">{tier.description}</p>
                                                    <ul role="list" className="mt-4 space-y-4">
                                                        {tier.features.map(feature => (
                                                            <li key={feature} className="flex">
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        d="M3 10.8L9.02046 17.2218C9.41554 17.6432
                                                                         10.0845 17.6432 10.4795 17.2218L21 6"
                                                                        stroke="#dbf7cd"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                    />
                                                                </svg>
                                                                <span className="ml-3">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        handleCreateSubscription().then(() => setOpen(false))
                                                    }
                                                    className="mx-auto bg-electric-green-600/80
                                                        hover:bg-electric-green-600 focus:outline-none focus:ring-2
                                                        focus:ring-offset-2 focus:ring-electric-green-700 mt-8 block
                                                        py-3 px-6 rounded-md text-center font-extrabold
                                                        text-noble-black-0 text-font-xl font w-full sm:w-2/3 transition
                                                        duration-300 ease-in-out cursor-pointer"
                                                >
                                                    {tier.cta}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                </div>
            )}
        </Transition>
    );
};

export default SubscriptionCard;
