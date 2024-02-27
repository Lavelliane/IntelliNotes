import vision from "@google-cloud/vision";
import { ChatOpenAI, OpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import zodToJsonSchema from "zod-to-json-schema";
import { CornellNotesSummarySchema } from "@/schema/schemas";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

const CONFIG = './vision-key.json'

export async function POST(req: Request, res: NextResponse) {
  const formData = await req.formData();

  const file = formData.get("file") as File;

  const client = new vision.ImageAnnotatorClient({
    keyFilename: CONFIG
  });
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const [result] = await client.textDetection(buffer);
    const detections = result.textAnnotations;
    if (detections) {
      const inputText = detections[0].description;

      const prompt = new ChatPromptTemplate({
        promptMessages: [
          SystemMessagePromptTemplate.fromTemplate(
            "You are an expert in summarizing images and fixing spelling and grammar errors. Your goal is to create a Cornell Notes format of an Image"
          ),
          HumanMessagePromptTemplate.fromTemplate(
            "Additional context: {inputText}"
          ),
        ],
        inputVariables: ["inputText"],
      });

      const model = new ChatOpenAI({
        modelName: "gpt-3.5-turbo-0125", // 3.5 option: "gpt-3.5-turbo-0125"
        temperature: 0.9,
        maxTokens: 4000,
      });

      const functionCallingModel = model.bind({
        functions: [
          {
            name: "output_formatter",
            description: "Should always be used to properly format output",
            parameters: zodToJsonSchema(CornellNotesSummarySchema),
          },
        ],
        function_call: { name: "output_formatter" },
      });

      const outputParser = new JsonOutputFunctionsParser();

      const chain = prompt.pipe(functionCallingModel).pipe(outputParser);

      const summary = await chain.invoke({
        inputText: inputText,
      });
      console.log(summary);
      return NextResponse.json({ result: summary });
    }
  }
  return NextResponse.json({ message: "An error has occurred" }, { status: 500 });
}
