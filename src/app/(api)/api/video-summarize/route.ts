import { loadSummarizationChain } from "langchain/chains";
import {
  RecursiveCharacterTextSplitter,
} from "langchain/text_splitter";
import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import { NextRequest, NextResponse } from "next/server";
import { SearchApiLoader } from "langchain/document_loaders/web/searchapi";
import videoIdExtractor from "@/utils/videoIdExtractor";


export async function POST(req: Request, res: NextResponse){
    const { url } = await req.json()

     const loader = new SearchApiLoader({
        engine: "youtube_transcripts",
        video_id: videoIdExtractor(url),
        apiKey: `${process.env.SERPAPI_API_KEY}`
      });
      
      const docs = await loader.load();
      
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 10000,
        chunkOverlap: 250,
      });
      
      const docsSummary = await splitter.splitDocuments(docs);
      
      const llmSummary = new OpenAI({
        modelName: "gpt-3.5-turbo-0125", // 3.5 option: "gpt-3.5-turbo-0125"
        temperature: 0.9,
        maxTokens: 4000,
      })
      
      const summaryTemplate = `
        You are an expert in summarizing Youtube Videos.
        Your goal is to create a cornell notes format of a Youtube Video.
        Below you find the details of the Youtube Video:
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
        mindMap: Array of objects. Each object has a keypoint and subPoint property. 
        DO NOT USE A CODE BLOCK. IMMEDIATELY RETURN THE JSON
        `;
        const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);

        const summaryRefineTemplate = `
            You are an expert in summarizing Youtube Videoss.
            Your goal is to create a Cornell Notes format of a Youtube Video.
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
            keyword: Parent Object. A single string providing a keyword/search term that generalizes the entire summary.
            mindMap: Array of objects. Each object has a keypoint and subPoint property. 
            DO NOT USE A CODE BLOCK. IMMEDIATELY RETURN THE JSON
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