import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function SortProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [show, setShow] = useState(false);

  const sortHandler = (option: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (option) {
      newParams.set("sort", option);
      newParams.set("page", "1");
    } else {
      newParams.delete("sort");
    }
    setSearchParams(newParams);
    setShow(false);
  };

  return (
    <div className="sort-menu">
      <button className="sort-button" onClick={() => setShow(!show)}>
        Sort
      </button>

      {show && (
        <div className="sort-list">
          <button onClick={() => sortHandler("price-asc")}>
            Price: lowest first
          </button>

          <button onClick={() => sortHandler("price-desc")}>
            Price: highest first
          </button>

          <button onClick={() => sortHandler("rating-desc")}>
            Rate: highest first
          </button>

          <button onClick={() => sortHandler("rating-asc")}>
            Rate: lowest first
          </button>

          <button onClick={() => sortHandler("")}>Clear sorting</button>
        </div>
      )}
    </div>
  );
}

export default SortProducts;
