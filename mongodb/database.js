import "server-only";
import mongoose from "mongoose";
import Character from "@/models/Character";
import Category from "@/models/Category";

let isConnected = false; // track the connection

export const connectToDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "VoxiVerse",
        });

        isConnected = true;

        const charactersCount = await Character.countDocuments({});
        if (charactersCount === 0) {
            console.warn("Characters collection is empty");
            const characterData = await getCharacterData();
            await Character.insertMany(characterData);
            console.log("Characters data inserted into the database");
        }

        const categoriesCount = await Category.countDocuments({});
        if (categoriesCount === 0) {
            console.warn("Categories collection is empty");
            const categories = require("./Category Data/category_data.json");
            await Category.insertMany(categories);
            console.log("Categories inserted into the database");
        }
    } catch (error) {
        console.error(error);
    }
};

async function getCharacterData() {
    const path = require("path");
    const characterDataDir = path.join(process.cwd(), "mongodb/Character Data");

    let characterData = [];

    try {
        const fs = require("fs").promises;
        const folders = await fs.readdir(characterDataDir);

        for (const folder of folders) {
            const folderPath = path.join(characterDataDir, folder);
            const stats = await fs.stat(folderPath);

            if (stats.isDirectory()) {
                const filePath = path.join(folderPath, "character_data.json");

                try {
                    const data = JSON.parse(await fs.readFile(filePath, "utf8"));
                    characterData = characterData.concat(data);
                } catch (err) {
                    // Handle error if file doesn't exist or has invalid JSON
                    console.error(`Error reading or parsing ${filePath}:`, err);
                }
            }
        }
    } catch (err) {
        console.error("Error reading directories:", err);
    }
    return characterData;
}
