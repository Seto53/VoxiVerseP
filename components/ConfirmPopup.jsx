"use client";

import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

const ConfirmPopup = ({open, setOpen, title, content, action, confirm}) => {
    return (
        <React.Fragment>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    variant="outlined"
                    role="alertdialog"
                    sx={{
                        backgroundColor: "var(--noble-black-600)",
                        borderColor: "var(--noble-black-700)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        fontFamily: "var(--font-plus-jakarta-sans)",
                    }}
                >
                    <DialogTitle
                        sx={{
                            color: "var(--noble-black-100)",
                            fontFamily: "var(--font-plus-jakarta-sans)",
                        }}
                    >
                        <WarningRoundedIcon />
                        {title}
                    </DialogTitle>
                    <Divider />
                    <DialogContent
                        sx={{
                            color: "var(--noble-black-200)",
                        }}
                    >
                        {content}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="solid"
                            color="danger"
                            onClick={() => {
                                setOpen(false);
                                confirm().then();
                            }}
                            sx={{
                                color: "var(--noble-black-100)",
                                fontFamily: "var(--font-plus-jakarta-sans)",
                            }}
                        >
                            {action}
                        </Button>
                        <Button
                            variant="plain"
                            color="neutral"
                            onClick={() => setOpen(false)}
                            sx={{
                                color: "var(--noble-black-100)",
                                fontFamily: "var(--font-plus-jakarta-sans)",
                            }}
                            className="hover:bg-noble-black-500/30 hover:text-noble-black-100"
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
};

export default ConfirmPopup;
