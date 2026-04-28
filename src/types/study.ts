export type Methodology = "Usability Testing" | "Interview" | "Survey" | "Card Sorting" | "A/B Testing";
export type Status = "Planned" | "In Progress" | "Completed";

export interface Study {
  id: string;
  title: string;
  methodology: Methodology;
  status: Status;
  participantCount: number;
  durationMinutes: number;
  researcherName: string;
}

export type StudyCreate = Omit<Study, "id">;
export type StudyUpdate = Partial<StudyCreate>;
