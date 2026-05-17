import axios from "axios";
import type { Note } from "../types/note";

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
  search,
  page,
}: FetchNotesParams): Promise<FetchNotesRes> => {
  const res = await axios.get<FetchNotesRes>("/notes", {
    params: {
      search,
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default fetchNotes;
