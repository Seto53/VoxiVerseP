import "server-only";
import Home from "@/components/Home/Home";
import {connectToDB} from "@/mongodb/database";
import Category from "@/models/Category";
import Character from "@/models/Character";

const HomePage = async () => {
    await connectToDB();

    const categoriesResults = await Category.findOne({name: "categories"});
    if (!categoriesResults) {
        throw new Error("Categories not found");
    }

    const categories = {
        main: categoriesResults.main,
        sub: categoriesResults.sub,
    };

    const charactersResults = await Character.find().skip(0).limit(30);
    if (!charactersResults) {
        throw new Error("Characters not found");
    }

    const characters = [];
    for (let i = 0; i < charactersResults.length; i++) {
        charactersResults[i] = charactersResults[i].toObject();
        characters.push({
            id: charactersResults[i]._id.toString(),
            name: charactersResults[i].name,
            image: charactersResults[i].image,
            shortDescription: charactersResults[i].shortDescription,
            totalInteractions: charactersResults[i].totalInteractions,
            category: charactersResults[i].category,
            tags: charactersResults[i].tags,
            bio: charactersResults[i].bio,
            greeting: charactersResults[i].greeting,
        });
    }

    return (
        <>
            <Home characters={characters} categories={categories} />
        </>
    );
};

export default HomePage;
