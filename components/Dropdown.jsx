"use client";

import {Transition} from "@headlessui/react";
import styles from "../styles/Dropdown.module.css";
import {useEffect, useRef} from "react";
import Image from "next/image";

const Dropdown = ({dropdownOpen, setDropdownOpen, handleDeleteChat}) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setDropdownOpen]);

    return (
        <Transition
            show={dropdownOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            style={{
                zIndex: 1000,
                position: "relative",
            }}
        >
            <div className={styles.dropdown} ref={dropdownRef} onClick={() => handleDeleteChat()}>
                <div className={styles.listItem}>
                    <div className={styles.left}>
                        <Image
                            className={styles.magicWandIcon1}
                            alt="Close"
                            src="/icons/crosscircle.svg"
                            width={24}
                            height={24}
                        />
                        <div className={styles.option}>
                            <div className={styles.option1}>Delete chat</div>
                        </div>
                    </div>
                    <div />
                </div>
            </div>
        </Transition>
    );
};

export default Dropdown;
