import styles from "../../../styles/Search.module.css";
import Grid from "@mui/material/Grid";
import styles2 from "@/styles/CharacterCard.module.css";
import Card from "@mui/material/Card";
import SidebarLoading from "@/components/Sidebar/SidebarLoading";

export const metadata = {
    title: "Search results:",
};

const SearchLoading = () => {
    return (
        <>
            <SidebarLoading />
            <div className="md:pl-[200px] transition-all duration-300 flex flex-col flex-1">
                <main className={styles.search}>
                    <div className={styles.content + " transition-opacity duration-500"}>
                        <>
                            <Grid container spacing={2}>
                                {[...Array(20)].map((_, i) => (
                                    <Grid item className={styles2.card} key={i}>
                                        <Card
                                            className={`${styles.characterCard}`}
                                            sx={{backgroundColor: "var(--noble-black-600)"}}
                                        ></Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    </div>
                </main>
            </div>
        </>
    );
};

export default SearchLoading;
