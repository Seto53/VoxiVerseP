"use client";

import {createContext, useContext, useState} from "react";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
    return useContext(SidebarContext);
};

const SidebarProvider = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarFolded, setSidebarFolded] = useState(false);
    const [subscriptionOpen, setSubscriptionOpen] = useState(false);

    // noinspection JSUnusedGlobalSymbols
    const value = {
        sidebarOpen,
        toggleSidebar,
        sidebarFolded,
        foldSidebar,
        subscriptionOpen,
        setSubscriptionOpen,
    };

    function toggleSidebar() {
        setSidebarOpen(!sidebarOpen);
    }

    function foldSidebar() {
        setSidebarFolded(!sidebarFolded);
    }

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
