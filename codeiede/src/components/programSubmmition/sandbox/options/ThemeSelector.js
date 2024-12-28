function ThemeSelector({ themes, theme, onThemeChange }) {
  return (
    <div className="relative">
      <select
        id="theme-select"
        value={theme}
        onChange={onThemeChange}
        className="w-[10rem] block appearance-none bg-white border border-gray-300 text-gray-700 rounded-md  py-[4px] px-2 text-sm leading-tight focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
      >
        {themes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M9.293 14.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L9 12.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4z"
          />
        </svg>
      </div>
    </div>
  );
}

export default ThemeSelector;
