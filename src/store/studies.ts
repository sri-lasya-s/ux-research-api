import { supabase } from "./supabase";
import { Study, StudyCreate, StudyUpdate } from "../types/study";

export const findAll = async (): Promise<Study[]> => {
  const { data, error } = await supabase.from("studies").select("*");
  if (error) throw error;
  return data as Study[];
};

export const findById = async (id: string): Promise<Study | undefined> => {
  const { data, error } = await supabase.from("studies").select("*").eq("id", id).single();
  if (error) return undefined;
  return data as Study;
};

export const create = async (body: StudyCreate): Promise<Study> => {
  const { data, error } = await supabase.from("studies").insert(body).select().single();
  if (error) throw error;
  return data as Study;
};

export const update = async (id: string, body: StudyUpdate): Promise<Study | undefined> => {
  const { data, error } = await supabase.from("studies").update(body).eq("id", id).select().single();
  if (error) return undefined;
  return data as Study;
};

export const remove = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("studies").delete().eq("id", id);
  return !error;
};