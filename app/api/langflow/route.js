export async function POST(req) {
    try {
        const body = await req.json();

        // Send the request to the external API
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
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
        });

        // If the response is not OK, throw an error
        if (!response.ok) {
            const error = await response.text(); // Get raw response text
            try {
                const parsedError = JSON.parse(error); // Try to parse as JSON
                return new Response(JSON.stringify({ message: parsedError.message }), {
                    status: response.status,
                });
            } catch (e) {
                return new Response(
                    JSON.stringify({ message: "An error occurred: " + error }),
                    { status: response.status }
                );
            }
        }

        // Parse the response as JSON
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (err) {
        console.error("Error in POST handler:", err); // Log the error for debugging
        return new Response(
            JSON.stringify({ message: "Internal server error. Please try again later." }),
            { status: 500 }
        );
    }
}
