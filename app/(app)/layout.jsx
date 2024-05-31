import "@/styles/globals.css";
import Provider from "@/components/Provider";
import ReCaptcha from "@/components/ReCaptcha";
import {Analytics} from "@vercel/analytics/react";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Plus_Jakarta_Sans} from "next/font/google";
import SidebarContext from "@/components/SidebarContext";

const PlusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-plus-jakarta-sans",
});

export const metadata = {
    title: "VoxiVerse",
    description: "Meet your favorite characters with original voice. Start chatting today!",
    applicationName: "VoxiVerse",
    keywords: [
        "voxiverse",
        "chat",
        "voice",
        "text-to-speech",
        "AI",
        "movies",
        "TV",
        "anime",
        "text",
        "talk",
        "meet",
        "original voice",
        "character",
    ],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_WEBSITE_URL,
        site_name: "VoxiVerse",
        title: "VoxiVerse",
        description: "Meet your favorite characters with original voice. Start chatting today!",
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL),
    other: {
        seobility: "5e16c711eb96211856bd37e19e7ba959",
    },
};

// noinspection JSUnusedGlobalSymbols
export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    colorScheme: "dark",
};

const RootLayout = ({children}) => {
    return (
        <html lang="en" className={PlusJakartaSans.variable}>
            <body>
                <ReCaptcha reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
                    <Provider>
                        <SidebarContext>
                            <div className="bg-noble-black-700 font-plus-jakarta-sans">
                                {children}
                                <Analytics />
                                <SpeedInsights />
                            </div>
                        </SidebarContext>
                    </Provider>
                </ReCaptcha>
            </body>
        </html>
    );
};

export default RootLayout;
