type CornellNote = {
  cue: string;
  questions: string[];
  notes: string[];
};

export type CornellNotesSummary = {
  cornellNotes: CornellNote[];
  summary: string[];
  keyword: string;
};
