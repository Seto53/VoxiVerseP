"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "../styles/Support.module.css";
import Footer from "@/components/Footer";
import {useSidebar} from "@/components/SidebarContext";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Support = () => {
    const {sidebarFolded} = useSidebar();

    return (
        <>
            <Sidebar />
            <div className={`${!sidebarFolded ? "md:pl-[200px]" : ""} flex flex-col flex-1`}>
                <main className={styles.support}>
                    <Container maxWidth="md">
                        <Box className="p-6 rounded shadow-md">
                            <Typography
                                variant="h1"
                                gutterBottom
                                sx={{
                                    fontFamily: "var(--font-plus-jakarta-sans)",
                                }}
                                className="text-3xl font-bold text-noble-black-200 "
                            >
                                Need Help?
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontFamily: "var(--font-plus-jakarta-sans)",
                                }}
                            >
                                For any help or questions, please send an email to{" "}
                                <Link href="mailto:support@voxiverse.com" className="underline text-blue-500">
                                    support@voxiverse.com
                                </Link>
                                .
                            </Typography>
                        </Box>
                    </Container>
                    <Footer />
                </main>
            </div>
        </>
    );
};

export default Support;
