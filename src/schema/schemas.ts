import { z } from "zod";

export const CornellNotesSummarySchema = z.object({
  cornellNotes: z.array(
    z.object({
      cue: z.string(),
      questions: z.array(z.string()),
      notes: z.array(z.string()),
    })
  ),
  summary: z.array(z.string()),
});
