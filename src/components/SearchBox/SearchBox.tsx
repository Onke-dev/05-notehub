import type { ChangeEvent } from "react";
import css from "./SearchBox.module.css";
import type { DebouncedState } from "use-debounce";

interface SearchBoxProps {
  value: string;
  onSrearch: DebouncedState<(newValueSearch: string) => void>;
}

function SearchBox({ onSrearch, value }: SearchBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSrearch(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      defaultValue={value}
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}

export default SearchBox;
