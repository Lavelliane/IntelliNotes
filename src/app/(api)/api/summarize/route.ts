import { loadSummarizationChain } from "langchain/chains";
import {
  RecursiveCharacterTextSplitter,
} from "langchain/text_splitter";
import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { cornellNotesExtractionSchema } from "@/utils/refineFormat";

// Instantiate the parser
const parser = new JsonOutputFunctionsParser();

export async function POST(req: NextRequest, res: NextResponse) {
  console.log(req)
  const loader = new PDFLoader(req as any);
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter();
  const llmSummary = new OpenAI({
    modelName: "gpt-3.5-turbo-0125", // 3.5 option: "gpt-3.5-turbo-0125"
    temperature: 0.9,
    maxTokens: 4000,
  })

  const docsSummary = await splitter.splitDocuments(docs);

  const summaryTemplate = `
        You are an expert in summarizing PDFs.
        Your goal is to create a cornell notes format of a PDF.
        Below you find the details of the PDF:
        --------
        {text}
        --------

        Total output will be a modern JSON response with the following fields:
        cornellNotes: Parent object. An array of objects, each representing a specific cue.
        cue: Child of cornellNotes. A string representing the main topic or cue.
        questions: Child of cornellNotes. An array of strings containing questions related to the cue.
        notes: Child of cornellNotes. An array of strings providing notes or information associated with the cue.
        summary: Parent Object. An array of strings capturing the overall summary, including the synthesis of key points, 
        connections between different topics or cues, and conclusions or insights derived from the entire set of Cornell Notes.
        keyword: Parent Object. A single string providing a keyword/search term that generalizes the entire summary.
        `;
  const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);

  const summaryRefineTemplate = `
    You are an expert in summarizing PDFs.
    Your goal is to create a Cornell Notes format of a PDF.
    We have provided an existing summary up to a certain point: {existing_answer}
    
    Given the new context, refine the summary.
    If the context isn't useful, return the original summary.
    Total output will be a modern JSON response with the following fields:
    cornellNotes: Parent object. An array of objects, each representing a specific cue.
    cue: Child of cornellNotes. A string representing the main topic or cue.
    questions: Child of cornellNotes. An array of strings containing questions related to the cue.
    notes: Child of cornellNotes. An array of strings providing notes or information associated with the cue.
    summary: Parent Object. An array of strings capturing the overall summary, including the synthesis of key points, 
    connections between different topics or cues, and conclusions or insights derived from the entire set of Cornell Notes.

`;

  

  const SUMMARY_REFINE_PROMPT = PromptTemplate.fromTemplate(
    summaryRefineTemplate
  );
  const summarizeChain = loadSummarizationChain(llmSummary, {
    type: "stuff",
    verbose: true,
    prompt: SUMMARY_PROMPT
    // questionPrompt: SUMMARY_PROMPT,
    // refinePrompt: SUMMARY_REFINE_PROMPT,
  })

  const summary = await summarizeChain.run(docsSummary);

  console.log(summary);

  return NextResponse.json({ result: summary });
}
