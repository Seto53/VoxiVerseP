"use client";

import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {useRouter} from "next/navigation";
import {useSidebar} from "@/components/SidebarContext";

const SubscriptionStatus = ({status}) => {
    const router = useRouter();
    const {setSubscriptionOpen} = useSidebar();

    const handleManageSubscription = async () => {
        try {
            const res = await fetch("/api/stripe/manage-subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-cache",
            });
            if (!res.ok) {
                console.error(res);
                return;
            }

            const billingPortalSession = await res.json().then(data => {
                return data.data.session;
            });

            router.push(billingPortalSession.url);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-1">
            <h3 className="text-lg font-semibold mb-3">Subscription Status</h3>
            <div className="flex justify-between">
                <>
                    {status === "new" && (
                        <Chip
                            onClick={() => setSubscriptionOpen(true)}
                            icon={<CancelIcon />}
                            label="Inactive"
                            clickable
                            color="error"
                            className="font-bold"
                            sx={{
                                backgroundColor: "var(--noble-black-400)",
                                color: "var(--noble-black-100)",
                                "&:hover": {
                                    backgroundColor: "var(--noble-black-300)",
                                },
                            }}
                        />
                    )}
                    {status === "active" && (
                        <Chip
                            onClick={() => handleManageSubscription().then()}
                            icon={<CheckCircleIcon />}
                            label="Active"
                            clickable
                            color="success"
                            className="font-bold"
                        />
                    )}
                    {status === "canceling" && (
                        <Chip
                            onClick={() => handleManageSubscription().then()}
                            icon={<CancelIcon />}
                            label="Canceling"
                            clickable
                            color="warning"
                            className="font-bold"
                        />
                    )}
                    {status === "canceled" && (
                        <Chip
                            onClick={() => handleManageSubscription().then()}
                            icon={<CancelIcon />}
                            label="Inactive"
                            clickable
                            color="error"
                            className="font-bold"
                        />
                    )}
                </>
                <p
                    className="text-font-m text-noble-black-200 cursor-pointer hover:underline"
                    onClick={() => handleManageSubscription().then()}
                >
                    Manage your subscription
                </p>
            </div>
        </div>
    );
};

export default SubscriptionStatus;
