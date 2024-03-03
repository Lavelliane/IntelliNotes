import { z } from "zod";

const QuizQuestionSchema = z.object({
  question: z.string(),
  choices: z.array(z.string()),
  answer: z.number()
});

export const CornellNotesSummarySchema = z.object({
  cornellNotes: z.array(
    z.object({
      cue: z.string(),
      questions: z.array(z.string()),
      notes: z.array(z.string()),
    })
  ),
  quiz: z.array(QuizQuestionSchema).max(10),
  summary: z.array(z.string()),
  keyword: z.string(),
  mindMap: z.array(
    z.object({
      keypoint: z.string(),
      subPoint: z.string(),
    })
  ),
});
