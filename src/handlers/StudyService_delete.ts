import { Request, Response } from "express";
import * as store from "../store/studies";

export async function StudyService_delete(c: any, req: Request, res: Response): Promise<void> {
  const id = c.request.params.id;
  const deleted = await store.remove(id);
  if (!deleted) {
    res.status(404).json({ message: "Study not found" });
    return;
  }
  res.status(200).json({ message: "Study deleted successfully" });
}