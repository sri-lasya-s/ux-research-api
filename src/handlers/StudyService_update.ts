import { Request, Response } from "express";
import * as store from "../store/studies";
import { StudyUpdate } from "../types/study";

export async function StudyService_update(c: any, req: Request, res: Response): Promise<void> {
  const id = c.request.params.id;
  const body = c.request.requestBody as StudyUpdate;
  const study = await store.update(id, body);
  if (!study) {
    res.status(404).json({ message: "Study not found" });
    return;
  }
  res.status(200).json(study);
}