import { streamText } from "ai";
import { groq } from '@ai-sdk/groq';


export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();
        const result = streamText({
            model: groq('llama-3.3-70b-versatile'),
            prompt,
        });
        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("Error in /api/completion/stream:", error);
        return Response.json({ error: "Failed to generate text" }, { status: 500 });
    }
}