import React from "react";

const newsTypes = ["all", "sport", "health", "technology", "politic"];

const NewsTypeButtons = ({ activeType, setActiveType}) => {

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-800">
      {newsTypes.map((type) => (
        <button
          key={type}
          onClick={() => setActiveType(type)}
          className={`px-4 py-2 rounded-md capitalize ${
            activeType === type
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white border"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default NewsTypeButtons;