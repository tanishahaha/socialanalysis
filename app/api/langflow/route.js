export async function POST(req) {
    const body = await req.json();

    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.LANGFLOW_API_TOKEN}`,
            },
            body: JSON.stringify({
                input_value: body.input_value,
                output_type: "chat",
                input_type: "chat",
                tweaks: {
                    "ChatInput-Ecaui": {},
                    "ChatOutput-vUfmu": {},
                    "Agent-DptLp": {},
                    "Prompt-K5Zju": {},
                    "AstraDB-DBGUh": {},
                    "ParseData-CvbZX": {},
                    "File-gOfP2": {},
                    "SplitText-nmZ94": {},
                    "AstraDB-B3ceS": {},
                },
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        return new Response(JSON.stringify({ message: error.message }), {
            status: response.status,
        });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
}
