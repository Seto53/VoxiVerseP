import styles from "@/styles/Home.module.css";
import styles2 from "@/styles/CharacterCard.module.css";
import Category from "@/components/Home/Category";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Footer from "@/components/Footer";
import SidebarLoading from "@/components/Sidebar/SidebarLoading";

const HomeLoading = async () => {
    return (
        <>
            <SidebarLoading selected={"Home"} />
            <div className="md:pl-[200px] flex flex-col flex-1">
                <Category />
                <main className={styles.home}>
                    <div className={styles.contentLoading}>
                        <>
                            <Grid container spacing={2}>
                                {[...Array(30)].map((_, i) => (
                                    <Grid item className={styles2.card} key={i}>
                                        <Card
                                            className={`${styles.characterCard}`}
                                            sx={{backgroundColor: "var(--noble-black-600)"}}
                                        ></Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                        <Footer />
                    </div>
                </main>
            </div>
        </>
    );
};

export default HomeLoading;
