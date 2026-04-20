import { supabase } from "../supabase";
import { Study, StudyCreate, StudyUpdate } from "../types/study";

export async function findAll(): Promise<Study[]> {
  const { data, error } = await supabase
    .from("studies")
    .select("*");
  if (error) throw error;
  return data as Study[];
}

export async function findById(id: string): Promise<Study | undefined> {
  const { data, error } = await supabase
    .from("studies")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return undefined;
  return data as Study;
}

export async function create(body: StudyCreate): Promise<Study> {
  const { data, error } = await supabase
    .from("studies")
    .insert(body)
    .select()
    .single();
  if (error) throw error;
  return data as Study;
}

export async function update(id: string, body: StudyUpdate): Promise<Study | undefined> {
  const { data, error } = await supabase
    .from("studies")
    .update(body)
    .eq("id", id)
    .select()
    .single();
  if (error) return undefined;
  return data as Study;
}

export async function remove(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("studies")
    .delete()
    .eq("id", id);
  if (error) return false;
  return true;
}