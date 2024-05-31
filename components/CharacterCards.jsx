import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/CharacterCard.module.css";

const CharacterCard = ({id, name, image, shortDescription}) => {
    return (
        <Grid item className={styles.card}>
            <Link href={"/chat/" + id}>
                <Card
                    className="hover:bg-noble-black-500/40"
                    sx={{
                        borderRadius: "var(--br-16)",
                        backgroundColor: "var(--noble-black-600)",
                        height: "250px",
                        minWidth: "120px",
                    }}
                >
                    <div
                        style={{
                            height: "60%",
                            borderRadius: "10%",
                            marginTop: "0.5rem",
                            marginLeft: "0.5rem",
                            marginRight: "0.5rem",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <Image src={"/characters/" + image} width={1000} height={1000} alt={name} />
                    </div>
                    <CardContent
                        sx={{
                            padding: "var(--padding-8) var(--padding-8) var(--padding-8) var(--padding-8)",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "var(--noble-black-0)",
                                mb: 1,
                                fontSize: "var(--font-m)",
                                fontWeight: "bold",
                                fontFamily: "var(--font-plus-jakarta-sans)",
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            sx={{
                                color: "var(--noble-black-200)",
                                fontSize: "var(--font-s)",
                                minHeight: "50px",
                                fontFamily: "var(--font-plus-jakarta-sans)",
                            }}
                        >
                            {shortDescription}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
};

const CharacterCards = ({characters}) => {
    if (!characters) return <div></div>;
    return (
        <Grid container spacing={2}>
            {characters.map(character => (
                <CharacterCard
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    image={character.image}
                    shortDescription={character.shortDescription}
                />
            ))}
        </Grid>
    );
};

export default CharacterCards;
