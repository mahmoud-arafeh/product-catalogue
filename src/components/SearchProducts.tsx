import { useRef, useState } from "react";
import { useSearchParams } from "react-router";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setSearchParams] = useSearchParams();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setSearchParams((currentParams) => {
        const newParams = new URLSearchParams(currentParams);
        if (value) {
          newParams.set("search", value);
        } else {
          newParams.delete("search");
        }
        newParams.delete("category");
        newParams.set("page", "1");
        return newParams;
      });
    }, 500);
  };

  const searchInput = (
    <input
      className="search-input"
      name="search"
      type="search"
      placeholder="Search"
      value={searchTerm}
      onChange={inputChangeHandler}
    />
  );

  return searchInput;
}
export default SearchBar;
