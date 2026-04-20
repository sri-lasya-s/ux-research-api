import { Request, Response } from "express";
import * as store from "../store/studies";

export async function StudyService_summary(c: any, req: Request, res: Response): Promise<void> {
  const studies = await store.findAll();

  const totalStudies = studies.length;

  const averageDuration = Math.round(
    studies.reduce((sum, s) => sum + s.durationMinutes, 0) / totalStudies
  );

  const byStatus = {
    Planned: studies.filter((s) => s.status === "Planned").length,
    Active: studies.filter((s) => s.status === "Active").length,
    Completed: studies.filter((s) => s.status === "Completed").length,
  };

  const byStudyType = {
    Usability: studies.filter((s) => s.studyType === "Usability").length,
    Interview: studies.filter((s) => s.studyType === "Interview").length,
    Survey: studies.filter((s) => s.studyType === "Survey").length,
    "A/B Test": studies.filter((s) => s.studyType === "A/B Test").length,
  };

  res.status(200).json({
    totalStudies,
    averageDuration,
    byStatus,
    byStudyType,
  });
}