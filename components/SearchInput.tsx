import { useRouter } from "next/router";
import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchInput() {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState("");
  return (
    <form
      className=" relative rounded-xl overflow-hidden flex justify-start "
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search/${keyword}`);
      }}
    >
      <button className="p-5 bg-secondary-dark " type="submit">
        <span className="text-text-dark text-4xl">
          <FaSearch />
        </span>
      </button>
      <input
        type="text"
        className="w-full border-0 outline-0 bg-secondary-dark p-5 text-text-dark
        focus:bg-secondary-dark focus:text-text-dark text-3xl font-bold"
        placeholder="Search for movies or TV series"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
}

export default SearchInput;
