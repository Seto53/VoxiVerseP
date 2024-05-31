"use client";

import {Transition} from "react-transition-group";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import {useRef} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

const LoginCard = ({open, setOpen}) => {
    const nodeRef = useRef(null);
    const router = useRouter();

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
                                    className="relative font-plus-jakarta-sans rounded-2xl text-noble-black-0 p-1
                                bg-noble-black-600 sm:w-[340px] lg:w-[340px] xl:w-[340px]"
                                >
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="absolute top-0 right-0 p-1 rounded-full hover:bg-noble-black-700
                                        transition duration-300"
                                    >
                                        <Image src={"/icons/cross.svg"} alt={"Close"} width={24} height={24} />
                                    </button>
                                    <h2 className="text-xl font-bold tracking-tight mb-2 text-center">
                                        Sign in to send a message!
                                    </h2>
                                    <div className="flex">
                                        <div
                                            onClick={() => router.push("/login")}
                                            className="mx-auto mt-4 text-center text-font-l font w-2/3 transition
                                            duration-300 ease-in-out cursor-pointer py-2
                                            border rounded-md shadow-sm font-medium border-noble-black-500
                                            focus:ring-2 text-noble-black-200 hover:text-noble-black-0
                                            bg-noble-black-700/30 mr-1"
                                        >
                                            Log in
                                        </div>
                                        <div
                                            onClick={() => router.push("/register")}
                                            className="mx-auto mt-4 text-center text-font-l font w-2/3 transition
                                            duration-300 ease-in-out cursor-pointer flex justify-center py-2
                                            px-4 border border-transparent rounded-md shadow-sm font-medium
                                            bg-stem-green-500 hover:bg-stem-green-600 focus:ring-2 text-noble-black-800"
                                        >
                                            Make an account!
                                        </div>
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

export default LoginCard;
