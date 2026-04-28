import { Request, Response } from "express";
import { Context } from "openapi-backend";
import * as store from "../store/studies";
import { StudyCreate, StudyUpdate } from "../types/study";

export const StudyService_list = async (_c: Context, _req: Request, res: Response) => {
  const studies = await store.findAll();
  res.json(studies);
};

export const StudyService_create = async (c: Context, _req: Request, res: Response) => {
  const study = await store.create(c.request.requestBody as StudyCreate);
  res.status(201).json(study);
};

export const StudyService_get = async (c: Context, _req: Request, res: Response) => {
  const study = await store.findById(c.request.params.id as string);
  return study ? res.json(study) : res.status(404).json({ code: 404, message: "Study not found" });
};

export const StudyService_update = async (c: Context, _req: Request, res: Response) => {
  const study = await store.update(c.request.params.id as string, c.request.requestBody as StudyUpdate);
  return study ? res.json(study) : res.status(404).json({ code: 404, message: "Study not found" });
};

export const StudyService_delete = async (c: Context, _req: Request, res: Response) => {
  const deleted = await store.remove(c.request.params.id as string);
  return deleted ? res.json({ message: "Study deleted" }) : res.status(404).json({ code: 404, message: "Study not found" });
};

export const StudyService_summary = async (_c: Context, _req: Request, res: Response) => {
  const all = await store.findAll();
  const totalStudies = all.length;
  const averageParticipants = totalStudies === 0 ? 0 : Math.round(all.reduce((sum, s) => sum + s.participantCount, 0) / totalStudies);
  const byMethodology = all.reduce((acc, s) => {
    acc[s.methodology] = (acc[s.methodology] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  res.json({ totalStudies, averageParticipants, byMethodology });
};