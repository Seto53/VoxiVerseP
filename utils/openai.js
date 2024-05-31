import "server-only";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateText(message, prompt, messagesArray) {
    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: prompt},
            ...messagesArray,
            {
                role: "user",
                content: message,
            },
        ],
        model: "gpt-4-1106-preview",
        temperature: 1,
        top_p: 0,
        max_tokens: 100,
    });
    if (!completion.choices[0]) {
        console.error(completion);
        throw new Error("Error while generating text");
    }
    const response = completion.choices[0].message.content;
    return response.replace(/#\w+/g, "").trim();
}

export default generateText;
