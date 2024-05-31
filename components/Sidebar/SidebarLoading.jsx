"use client";

import {Fragment} from "react";
import {Dialog, Menu, Transition} from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import {useSidebar} from "@/components/SidebarContext";

const navigation = [
    {name: "Home", href: "/", icon: "/icons/home.svg"},
    {name: "Chats", href: "/chat", icon: "/icons/chatbubble.svg"},
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const SidebarLoading = ({selected}) => {
    const {sidebarOpen, sidebarFolded, toggleSidebar} = useSidebar();

    return (
        <div className="font-plus-jakarta-sans">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={toggleSidebar}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div
                            className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-noble-black-800
                            font-plus-jakarta-sans"
                        >
                            <div className="flex-shrink-0 flex items-center px-4">
                                <Image width={150} height={150} src="/logo/logo.png" alt="VoxiVerse" />
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav className="px-2 space-y-1">
                                    {navigation.map(item => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                selected === item.name
                                                    ? "bg-stem-green-600 text-noble-black-700"
                                                    : "hover:bg-stem-green-700/30 text-noble-black-100",
                                                "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                            )}
                                        >
                                            <Image
                                                src={item.icon}
                                                className="mr-4 flex-shrink-0 text-noble-black-200"
                                                aria-hidden="true"
                                                alt={"Search"}
                                                width={24}
                                                height={24}
                                            />
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Test double element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="md:pl-[200px] flex flex-col flex-1">
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 shadow bg-noble-black-700">
                    <button
                        type="button"
                        className="px-4 focus:outline-none focus:ring-2 focus:ring-inset
                            focus:ring-indigo-500 md:hidden text-noble-black-200"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Image
                            src={"/icons/menu.svg"}
                            className="text-noble-black-200"
                            aria-hidden="true"
                            alt={"Close"}
                            width={24}
                            height={24}
                        />
                    </button>
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex h-5/6 pt-2">
                            <form className="w-full flex md:ml-0">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                    <button className="absolute inset-y-0 left-0 flex items-center pl-2">
                                        <Image
                                            src={"/icons/search.svg"}
                                            className="text-noble-black-200"
                                            aria-hidden="true"
                                            alt={"Search"}
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                    <input
                                        id="search-field"
                                        className="block w-full h-full pl-8 pr-3 py-2 sm:text-font-l
                                        placeholder-gray-500 focus:outline-none bg-noble-black-600
                                        focus:placeholder-gray-400 focus:ring-0 focus:border-transparent
                                        text-noble-black-100 rounded-xl border-noble-black-600"
                                        placeholder="Search"
                                        autoComplete="off"
                                        type="search"
                                        name="search"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="ml-4 flex items-center md:ml-3">
                            {/* Profile dropdown */}
                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button
                                        className="max-w-xs bg-white flex items-center text-sm
                                                        rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2
                                                         focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <Image
                                            className="h-8 w-8 rounded-full min-w-[32px]"
                                            src={"/icons/user.svg"}
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                        />
                                    </Menu.Button>
                                </div>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-[200px] md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar2 component, swap this element with another sidebar if you like */}
                <div className="flex flex-col pt-5 overflow-y-auto bg-noble-black-700">
                    <div className="flex items-center flex-shrink-0">
                        <button type="button" className="px-4 text-noble-black-200">
                            <span className="sr-only">Open sidebar</span>
                            <Image
                                src={"/icons/menu.svg"}
                                className="text-noble-black-200"
                                aria-hidden="true"
                                alt={"Close"}
                                width={24}
                                height={24}
                            />
                        </button>
                        <Link href={"/"}>
                            <Image width={150} height={150} src="/logo/logo.png" alt="VoxiVerse" />
                        </Link>
                    </div>
                    {sidebarFolded ? null : (
                        <div className="mt-5 flex-1 flex flex-col">
                            <nav className="flex-1 px-2 pb-4 space-y-1">
                                {navigation.map(item => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            selected === item.name
                                                ? "bg-stem-green-600 text-noble-black-700 text-w"
                                                : "hover:bg-stem-green-700/30 text-noble-black-100",
                                            "group flex items-center px-2 py-2 font-medium rounded-md"
                                        )}
                                    >
                                        <Image
                                            src={item.icon}
                                            className="mr-3 flex-shrink-0 text-noble-black-200"
                                            aria-hidden="true"
                                            alt={"Search"}
                                            width={24}
                                            height={24}
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SidebarLoading;
