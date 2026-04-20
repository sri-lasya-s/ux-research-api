import { Request, Response } from "express";
import * as store from "../store/studies";

export async function StudyService_get(c: any, req: Request, res: Response): Promise<void> {
  const id = c.request.params.id;
  const study = await store.findById(id);
  if (!study) {
    res.status(404).json({ message: "Study not found" });
    return;
  }
  res.status(200).json(study);
}