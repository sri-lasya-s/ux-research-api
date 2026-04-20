export interface Study {
  id: string;
  title: string;
  studyType: "Usability" | "Interview" | "Survey" | "A/B Test";
  status: "Planned" | "Active" | "Completed";
  researcherName: string;
  durationMinutes: number;
  notes?: string; 
}

export interface StudyCreate {
  title: string;
  studyType: "Usability" | "Interview" | "Survey" | "A/B Test";
  status: "Planned" | "Active" | "Completed";
  researcherName: string;
  durationMinutes: number;
  notes?: string;
}

export interface StudyUpdate {
  title?: string;
  studyType?: "Usability" | "Interview" | "Survey" | "A/B Test";
  status?: "Planned" | "Active" | "Completed";
  researcherName?: string;
  durationMinutes?: number;
  notes?: string;
}