import React, { useState, useEffect } from "react";

const citySuggestions = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
  "Kolkata", "Guwahati", "Pune", "Jaipur", "Ahmedabad",
  "Lucknow", "Patna", "Bhopal", "Indore", "Surat",
  "Kochi", "Nagpur", "Vishakhapatnam", "Shillong", "Imphal",
  "Itanagar", "Panaji", "Thiruvananthapuram", "Raipur", "Ranchi"
];

const SearchBar = ({ city, setCity, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!city) {
      setSuggestions([]);
      return;
    }

    const filtered = citySuggestions.filter((c) =>
      c.toLowerCase().startsWith(city.toLowerCase())
    );
    setSuggestions(filtered);
  }, [city]);

  const handleSuggestionClick = (selectedCity) => {
    setCity(selectedCity);
    setSuggestions([]);
    onSearch();
  };

  return (
    <div className="search-bar autocomplete">
      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={onSearch}>
        <img src="/weather_img/search.png" alt="Search" />
      </button>

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((s, idx) => (
            <li key={idx} onClick={() => handleSuggestionClick(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
