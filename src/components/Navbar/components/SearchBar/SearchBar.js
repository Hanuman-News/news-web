import React from "react";

const SearchBar = ({
  search,
  setSearch,
  showSearchInput,
  setShowSearchInput,
  onSearchSubmit,
  onClearSearch,
}) => {
  // const searchRef = useRef(null);
  const handleSubmit = () => {
    if (search.trim() !== "") {
      onSearchSubmit();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // const handleClearSearch = () => {
  //   setSearch("");
  //   onSearchSubmit(""); // Pass empty string to clear search
  //   setShowSearchInput(false); // Optional: hide search input after clearing
  // };

  return (
    <div className="flex items-center gap-2">
      {!showSearchInput ? (
        <button
          onClick={() => setShowSearchInput(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-64 p-2 border rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="px-3 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
          {search && (
            <button onClick={onClearSearch} className="clear-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;