"use client"
import { useState } from "react";

interface ResponseData {
    outputs: {
        outputs: {
            results: {
                message: {
                    text: string;
                };
            };
        }[];
    }[];
}

export default function Home() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<ResponseData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResponse(null);

        try {
            const res = await fetch("/api/langflow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input_value: input }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setResponse(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Social Media Post Analysis</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-full max-w-md">
                <label htmlFor="input" className="block mb-2 text-sm font-medium">
                    Enter Post Type (carousel, reels, static images):
                </label>
                <input
                    id="input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border rounded p-2 w-full mb-4"
                    placeholder="e.g., reels"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                >
                    Analyze
                </button>
            </form>

            {response && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded w-full md:max-w-2xl">
                    <h2 className="font-bold mb-2">Output:</h2>
                    <p>{response.outputs[0].outputs[0].results.message.text}</p>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded w-full max-w-md">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
