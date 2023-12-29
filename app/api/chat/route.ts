import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { code } = await req.json();
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-4-1106-preview',
    stream: true,
    messages: [
      {
        "role": "system",
        "content": "When given a description of a regular expression, write the regular expression to match it and do not write any other text."
      },
      {
        "role": "user",
        "content": "US phone numbers"
      },
      {
        "role": "assistant",
        "content": "^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$"
      },
      {
        "role": "user",
        "content": "Emails"
      },
      {
        "role": "assistant",
        "content": "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
      },
      {
        "role": "user",
        "content": `${code}`
      },
    ],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
