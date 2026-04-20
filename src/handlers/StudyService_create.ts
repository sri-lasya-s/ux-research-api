import { Request, Response } from "express";
import * as store from "../store/studies";
import { StudyCreate } from "../types/study";

export async function StudyService_create(c: any, req: Request, res: Response): Promise<void> {
  const body = c.request.requestBody as StudyCreate;
  const study = await store.create(body);
  res.status(201).json(study);
}