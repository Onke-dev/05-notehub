export interface Note {
  id: string;
  title: string;
  content: string;
  createdA: string;
  updatedAt: string;
  tag: string;
}

export interface NewNoteBody {
  title: string;
  content: string;
  tag: string;
}
