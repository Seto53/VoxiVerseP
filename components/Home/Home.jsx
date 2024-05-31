"use client";

import styles from "@/styles/Home.module.css";
import CharacterCards from "@/components/CharacterCards";
import Category from "@/components/Home/Category";
import {useEffect, useState} from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer";
import {useSidebar} from "@/components/SidebarContext";

const Home = ({characters, categories}) => {
    const {sidebarFolded} = useSidebar();

    const [category, setCategory] = useState(categories ? categories?.main[0] : null);
    const [charactersFiltered, setCharactersFiltered] = useState(characters);

    useEffect(() => {
        if (!category) return;
        if (category === "Featured") {
            setCharactersFiltered(characters);
            return;
        }
        setCharactersFiltered(characters.filter(character => character.category.includes(category)));
    }, [category, characters]);

    return (
        <>
            <Sidebar selected={"Home"} />
            <div className={`${!sidebarFolded ? "md:pl-[200px]" : ""} flex flex-col flex-1`}>
                <Category categories={categories} category={category} setCategory={setCategory} />
                <main className={styles.home}>
                    <div className={styles.content}>
                        <CharacterCards characters={charactersFiltered} />
                        <Footer />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
