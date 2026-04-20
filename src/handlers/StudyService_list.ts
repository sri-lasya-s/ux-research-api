import { Request, Response } from "express";
import * as store from "../store/studies";

export async function StudyService_list(c: any, req: Request, res: Response): Promise<void> {
  const studies = await store.findAll();
  res.status(200).json(studies);
}