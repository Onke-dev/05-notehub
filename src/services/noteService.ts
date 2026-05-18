import axios from "axios";
import type { NewNoteBody, Note } from "../types/note";

interface FetchNotesRes {
  notes: Note[];
  page: number;
  totalPages: number;
}

interface FetchNotesParams {
  search: string;
  page: number;
}

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const fetchNotes = async ({
  search: mysearchtext,
  page,
}: FetchNotesParams): Promise<FetchNotesRes> => {
  const res = await axios.get<FetchNotesRes>("/notes", {
    params: {
      search: mysearchtext,
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default fetchNotes;

export const createNote = async (newNote: NewNoteBody) => {
  const res = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteNote = async (taskId: string) => {
  const res = await axios.delete<Note>(`/notes/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
