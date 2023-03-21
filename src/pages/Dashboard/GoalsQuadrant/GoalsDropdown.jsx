import { useState, useEffect, useRef } from "react";

export default function GoalsDropdown({ markGoals, deleteGoals, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef(null);

  function handleMarkClick(e, boolValue) {
    e.preventDefault();
    markGoals(boolValue);
    toggleDropdown();
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left mb-1" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          id="menu-button"
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="true"
          onClick={toggleDropdown}
          disabled={disabled}
        >
          Options
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <a
              href="#"
              onClick={(e) => handleMarkClick(e, true)}
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Mark Complete
            </a>
            <a
              href="#"
              onClick={(e) => handleMarkClick(e, false)}
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              Mark Incomplete
            </a>
          </div>
          <div className="py-1" role="none">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
            >
              Add Sub-Goals
            </a>
          </div>
          <div className="py-1" role="none">
            <a
              href="#"
              onClick={e => e.preventDefault()}
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
            >
              Edit
            </a>
            <a
              href="#"
              onClick={deleteGoals}
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
            >
              Delete
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
