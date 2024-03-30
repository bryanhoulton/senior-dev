import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT_WRAPPER = (files: string) => `
Write a funny comment from a senior dev on a pull request. The comment should cause the reader
to question how they still work here, mildly insulting, or just rude. Write in all lowercase
and keep it short (because this PR isn't worth your time lol).

Funny example for your inspiration:
- "wait what is this?"
- "i dont think this is right"
- "i found 3 bugs" (but doesn't explain what they are)

Be creative!

Here are the diffs for the PR:
${files}
`;

export async function prompt(files: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: PROMPT_WRAPPER(files) }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}
