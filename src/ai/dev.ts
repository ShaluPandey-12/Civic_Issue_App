// Genkit AI development server entry point
// Referenced by package.json: "genkit:dev": "genkit start -- tsx src/ai/dev.ts"
// TODO: Add Genkit AI flows for image analysis, duplicate detection, and chatbot

import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

const ai = genkit({
  plugins: [googleAI()],
});

export default ai;
