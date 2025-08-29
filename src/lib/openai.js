import OpenAI from "openai";

export async function createChatCompletion(messages, options = {}) {
  const apiKey = options.apiKey || process.env.REACT_APP_API_KEY;
  const model = options.model || process.env.REACT_APP_MODEL || "gpt-4o-mini";
  const baseURL = options.baseURL || process.env.REACT_APP_API_BASE_URL;

  if (!apiKey) {
    throw new Error("Missing API key. Set API_KEY in your .env file.");
  }

  const openai = new OpenAI({
    apiKey,
    baseURL,
    timeout: 60000,
    dangerouslyAllowBrowser: true, // required for frontend usage
  });

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("OpenAI returned no content.");

    return content.trim();
  } catch (error) {
    throw new Error(`OpenAI error: ${error.message || "Unknown error occurred"}`);
  }
}
