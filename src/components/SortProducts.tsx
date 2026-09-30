import { useSearchParams } from "react-router-dom";

function SortProducts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortHandler = (option: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (option) {
      newParams.set("sort", option);
      newParams.set("page", "1");
    } else {
      newParams.delete("sort");
    }
    setSearchParams(newParams);
  };

  return (
    <div>
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
      <button onClick={() => sortHandler("")}>Cancel</button>
    </div>
  );
}

export default SortProducts;
