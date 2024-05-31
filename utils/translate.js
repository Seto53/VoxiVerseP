import "server-only";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const ENDPOINT = "https://translation.googleapis.com/language/translate/v2";

async function translateText(text, targetLanguageCode) {
    const response = await fetch(`${ENDPOINT}?key=${GOOGLE_API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            q: text,
            source: "en",
            target: targetLanguageCode,
            format: "text",
        }),
    });

    const data = await response.json();

    if (data.error) {
        console.error(data);
        throw new Error("Error while translating text");
    }

    return data.data.translations[0].translatedText;
}

export default async function translate(text, targetLanguageCode) {
    return await translateText(text, targetLanguageCode);
}
