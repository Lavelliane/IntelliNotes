export const cornellNotesExtractionSchema = {
  name: "cornellNotesExtractor",
  description: "Extracts fields from the Cornell Notes JSON.",
  parameters: {
    type: "object",
    properties: {
      cornellNotes: {
        type: "array",
        items: {
          type: "object",
          properties: {
            cue: { type: "string" },
            questions: {
              type: "array",
              items: { type: "string" },
            },
            notes: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
      summary: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["cornellNotes", "summary"],
  },
};




