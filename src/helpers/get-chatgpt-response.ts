import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

export const getChatGPTResponse = async (
  pokemonName: string
): Promise<string> => {
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct", // text-ada-001 is deprecated/removed in newer API versions usually, but I'll leave the code almost same but upgraded
    prompt: `Write some interesting data about pokemon ${pokemonName}`,
    temperature: 1,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return (
    response.choices[0]?.text ||
    `I don't have anythign about ${pokemonName}, I'm sorry`
  );
};
