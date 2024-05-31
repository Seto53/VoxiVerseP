"use client";

import {Transition} from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import {useRef} from "react";
import Image from "next/image";

const DisclamerCard = ({open, setOpen}) => {
    const nodeRef = useRef(null);

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
                                borderRadius: "10px",
                            }}
                        >
                            <DialogContent>
                                <div
                                    className="relative font-plus-jakarta-sans rounded-2xl text-noble-black-0 p-1
                                bg-noble-black-600 sm:w-[340px] lg:w-[340px] xl:w-[340px]"
                                >
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="absolute right-0 top-0 p-1 rounded-full hover:bg-noble-black-700
                                        transition duration-300"
                                    >
                                        <Image src={"/icons/cross.svg"} alt={"Close"} width={24} height={24} />
                                    </button>
                                    <h2 className="text-xl font-bold tracking-tight mb-1 text-center">
                                        Before you continue...
                                    </h2>
                                    <p className="text-center text-font-m">
                                        You are about to chat with a parody character. All audio responses are
                                        AI-generated.
                                    </p>
                                    <div className="text-center">
                                        <button
                                            onClick={() => setOpen(false)}
                                            className="mt-4 w-full bg-electric-green-500 text-noble-black-0
                                            font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl
                                            bg-electric-green-600/80 hover:bg-electric-green-600 focus:outline-none
                                            focus:ring-2 focus:ring-offset-2 focus:ring-electric-green-700 block
                                            text-center text-font-l font transition duration-300 ease-in-out
                                            cursor-pointer"
                                        >
                                            Continue
                                        </button>
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

export default DisclamerCard;
