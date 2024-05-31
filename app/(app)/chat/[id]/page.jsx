import "server-only";
import Chat from "@/components/Chat/Chat";
import {notFound, redirect} from "next/navigation";

export async function generateMetadata({params}) {
    const res = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/character/" + params.id, {
        method: "GET",
        next: {
            revalidate: 3600,
        },
    });
    if (res.ok) {
        return {
            title: (await res.json()).data.name,
        };
    }
    return {
        title: "Chat",
    };
}

const ChatPage = async ({params}) => {
    if (!params) return redirect("/");
    if (!params.id) return redirect("/");
    const res = await fetch(process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/character/" + params.id, {
        method: "GET",
        next: {
            revalidate: 3600,
        },
    });
    if (res.status === 404) {
        return notFound();
    }
    if (!res.ok) return redirect("/");

    const character = (await res.json()).data;
    return (
        <>
            <Chat
                id={character.id}
                characterName={character.name}
                characterImage={character.image}
                shortDescription={character.shortDescription}
            />
        </>
    );
};

export default ChatPage;
