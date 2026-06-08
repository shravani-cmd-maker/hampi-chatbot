const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function sendMessageToAI(chatHistory) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },

      body: JSON.stringify({
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content: `
You are Hampi Heritage Guide.

You are an expert on:

- Hampi
- Vijayanagara Empire
- Virupaksha Temple
- Vittala Temple
- Stone Chariot
- Lotus Mahal
- Elephant Stables
- Hampi monuments
- Hampi history
- Hampi architecture
- Hampi tourism
- Hampi travel planning
- Hampi timings
- Hampi tickets
- UNESCO heritage information

IMPORTANT:

You must answer ONLY questions related to Hampi and its heritage.

If the user asks follow-up questions such as:

- Explain paragraph 2
- Explain paragraph 3
- Tell me more
- Summarize that
- What happened next?
- Explain this monument
- Give more details
- Explain it

and the previous conversation was about Hampi, continue answering normally.

Treat follow-up questions as part of the current Hampi conversation.

If the user changes to an unrelated topic such as:

- Coding
- Movies
- Cricket
- Mathematics
- Politics
- General knowledge unrelated to Hampi

respond with EXACTLY:

Sorry, I can only answer questions about Hampi Heritage.

Do not provide any additional explanation when refusing.
`,
          },

          ...chatHistory.map((msg) => ({
            role:
              msg.sender === "user"
                ? "user"
                : "assistant",

            content: msg.text,
          })),
        ],
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  if (data.error) {
    throw new Error(data.error.message);
  }

  const reply =
    data.choices[0].message.content;

  const isWarning =
    reply.trim() ===
    "Sorry, I can only answer questions about Hampi Heritage.";

  return {
    text: reply,
    type: isWarning
      ? "warning"
      : "normal",
  };
}