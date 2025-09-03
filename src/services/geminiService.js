import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

const getSystemInstruction = (difficulty, aiColor) => {
    const colorName = aiColor === 'w' ? 'White' : 'Black';
    let personality = '';
    switch (difficulty) {
        case 'easy':
            personality = "You are a novice chess player. You sometimes make mistakes and overlook better moves. You are playing as " + colorName + ".";
            break;
        case 'medium':
            personality = "You are a skilled club-level chess player. You can spot tactics and plan a few moves ahead. You are playing as " + colorName + ".";
            break;
        case 'hard':
            personality = "You are a grandmaster-level chess AI. You play with deep strategic understanding and tactical precision. You are playing as " + colorName + ".";
            break;
    }
    return `${personality} The user will provide the move history in PGN format. Your task is to respond with the next best move in Standard Algebraic Notation (SAN), and only the move. For example: "e4" or "Nf3". Do not provide any explanation or commentary.`;
};
const getAiMove = async (pgn, difficulty, aiColor) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Here is the PGN of the current chess game:\n\n${pgn}`,
            config: {
                systemInstruction: getSystemInstruction(difficulty, aiColor),
                temperature: 0.3,
                topP: 0.9,
                // Disable thinking for faster response, suitable for a chess engine like task
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        const move = response.text.trim();
        // Basic validation to ensure it looks like a move.
        // The chess engine will perform full validation.
        if (move && move.length > 1 && move.length < 7) {
            return move;
        }
        else {
            console.error("Gemini returned an invalid move format:", move);
            throw new Error("Invalid move format from AI");
        }
    }
    catch (error) {
        console.error("Error getting AI move from Gemini:", error);
        throw error;
    }
};
export { getAiMove };
