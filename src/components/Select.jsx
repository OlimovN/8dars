import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function Select({ countries }) {
  const [openOptions, setOpenOptions] = useState(false);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState([]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (countries && countries.length > 0) {
      setSelected(countries[0]);
      setValue(countries[0].name);
    }
  }, [countries]);

  function handleOpenOptions() {
    setOpenOptions(!openOptions);
  }

  function handleSelect(country) {
    setSelected(country);
    setOpenOptions(false);
    setFiltered([]);
    setValue(country.name);
  }

  function handleInput(e) {
    const inputValue = e.target.value.toLowerCase();
    setValue(e.target.value);

    const filteredData = countries.filter((country) =>
      country.name.toLowerCase().includes(inputValue)
    );
    setFiltered(filteredData);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="relative w-80">
      <label
        htmlFor="select"
        className="block mb-2 text-sm font-medium text-gray-800"
      >
        Select a Country
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInput}
          onFocus={() => setOpenOptions(true)}
          onBlur={() => setTimeout(() => setOpenOptions(false), 100)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out"
          placeholder="Select a country"
        />
        <button
          type="button"
          onClick={handleOpenOptions}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
        >
          <FontAwesomeIcon icon={openOptions ? faChevronUp : faChevronDown} />
        </button>
        {openOptions && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-10 transition-transform duration-300 ease-in-out">
            {(filtered.length > 0 ? filtered : countries).map((country) => (
              <li
                key={country.name}
                onClick={() => handleSelect(country)}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-8 h-5 mr-3"
                />
                <div>
                  <div className="font-semibold">{country.name}</div>
                  {country.currencies &&
                    Object.values(country.currencies).map((currency) => (
                      <div
                        key={currency.name}
                        className="text-sm text-gray-600"
                      >
                        <div>
                          {currency.name} ({currency.symbol})
                        </div>
                        <div>Rate to USD: {currency.rateToUSD}</div>
                      </div>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        )}
        {selected && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <img
                src={selected.flag}
                alt={selected.name}
                className="w-12 h-8 mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{selected.name}</h3>
                {selected.currencies &&
                  Object.values(selected.currencies).map((currency) => (
                    <div key={currency.name} className="text-sm text-gray-600">
                      <div>
                        {currency.name} ({currency.symbol})
                      </div>
                      <div>Rate to USD: {currency.rateToUSD}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Select;
