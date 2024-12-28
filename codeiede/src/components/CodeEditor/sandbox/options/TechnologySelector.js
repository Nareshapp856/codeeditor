import React, { useContext } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../../../context/UserContext";

function TechnologySelector({
  programmingLanguages,
  selectedLanguage,
  setSelectedLanguage,
}) {
  const { problemId } = useParams();
  const { user } = useContext(UserContext);

  const handleChange = (event) => {
    setSelectedLanguage({
      key: problemId + "::" + String(user?.username || "guest"),
      language: event.target.value,
    });
  };

  return (
    <div className="relative">
      <select
        className="bg-white border border-gray-300 appearance-none rounded-md px-3 py-2 pr-8 text-sm font-medium text-gray-600 min-w-[8rem] focus:outline-none focus:border-blue-500"
        id="technology-selector-select"
        value={selectedLanguage}
        onChange={handleChange}
      >
        {programmingLanguages.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export default TechnologySelector;
