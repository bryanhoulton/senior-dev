import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT_1 = `
Write a funny comment from a senior dev on a pull request. The comment should cause the reader
to question how they still work here, mildly insulting, or just rude. Write in all lowercase
and keep it short (because this PR isn't worth your time lol).

Funny example for your inspiration:
- wait what is this?
- i dont think this is right
- i found 3 bugs in this code, try again

Be creative!
`;

const PROMPT_2 = `
You are a senior dev reviewing a pull request. Write a long rant about how the code is
terrible, how the author should be fired, and how you could do it better in your sleep.
Make it as rude and unhelpful as possible. Write in all lowercase.
`;

const PROMPT_3 = `
You are a senior dev reviewing this PR. Write a haiku about a pull request. The haiku
should be about how the code is terrible, you don't understand it, how the design pattern
is wrong, etc.
`;

const PROMPTS = [PROMPT_2, PROMPT_2, PROMPT_2, PROMPT_2, PROMPT_1, PROMPT_3];

const PROMPT_WRAPPER = (prompt: string, files: string) => `
${prompt}

You can't be too rude because your boss is watching, but be as unhelpful as possible and
as rude as you can get away with.

Here are the diffs for the PR:
${files}
`;

export async function prompt(files: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: PROMPT_WRAPPER(
          PROMPTS[Math.floor(Math.random() * PROMPTS.length)],
          files
        ),
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}
