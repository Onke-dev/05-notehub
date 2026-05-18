import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import fetchNotes from "../../services/noteService";
import { useState } from "react";
import Pagination from "../ReactPaginate/ReactPaginate";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["notes", topic, page],
    queryFn: () => fetchNotes({ search: topic, page }),
    placeholderData: keepPreviousData,
  });

  const onSrearch = useDebouncedCallback((newValueSearch: string) => {
    setTopic(newValueSearch);
  }, 300);

  const totalpage = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox onSrearch={onSrearch} value={topic} />}
        {totalpage > 0 && (
          <Pagination
            pageCount={totalpage}
            forcePage={page}
            onPageChange={setPage}
          />
        )}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
        {open && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default App;
