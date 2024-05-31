"use client";

import {useEffect, useRef, useState} from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "../styles/Search.module.css";
import CharacterCards from "@/components/CharacterCards";
import {redirect, useSearchParams} from "next/navigation";
import {useSidebar} from "@/components/SidebarContext";
import Image from "next/image";

const Search = () => {
    const searchParams = useSearchParams();
    const {sidebarFolded} = useSidebar();

    const [characters, setCharacters] = useState([]);
    const [noResult, setNoResult] = useState(false);
    const lastFetchTime = useRef(0);

    useEffect(() => {
        const currentTime = Date.now();
        if (currentTime - lastFetchTime < 2000) {
            return;
        }
        lastFetchTime.current = currentTime;
        setCharacters([]);
        setNoResult(false);
        if (searchParams.get("q")) {
            fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + `/api/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        query: searchParams.get("q"),
                        count: 30,
                    },
                }),
                next: {
                    revalidate: 3600,
                },
            })
                .then(res => res.json())
                .then(res => {
                    setCharacters(res.data);
                    setNoResult(res.data.length === 0);
                });
        } else {
            redirect("/");
        }
    }, [searchParams]);

    return (
        <>
            <Sidebar />
            <div
                className={`${!sidebarFolded ? "md:pl-[200px]" : ""} transition-all duration-300 flex flex-col 
            flex-1`}
            >
                <main className={styles.search}>
                    <div className={styles.content + " transition-opacity duration-500"}>
                        {noResult ? (
                            <div className="text-center text-noble-black-100 m-5">
                                <Image
                                    src="/icons/facesad.svg"
                                    width={80}
                                    height={80}
                                    className="mx-auto mb-4 text-gray-400"
                                    alt={"facesad"}
                                />
                                <h2 className="text-xl font-semibold">
                                    No results found for &quot;{searchParams.get("q")}&quot;
                                </h2>
                                <p>Try a different search term or check your spelling.</p>
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-center text-noble-black-100 m-2 text-xl font-semibold">
                                    Search results for &quot;{searchParams.get("q")}&quot;:
                                </h1>
                                <CharacterCards characters={characters} />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Search;
