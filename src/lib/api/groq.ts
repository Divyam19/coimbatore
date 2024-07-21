import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqResponse(Content: string) {
  const chatCompletion = await getGroqChatCompletion(Content);
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
  return chatCompletion.choices[0]?.message?.content || "";
}

export async function getGroqChatCompletion(Content: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: Content,
      },
    ],
    model: "llama3-8b-8192",
  });
}
