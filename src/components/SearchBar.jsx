import React, { useState, useEffect } from "react";

const SearchBar = ({ city, setCity, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!city) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city},IN&limit=5&appid=4eb241b7af83393993d52117f98abaad`
        );
        const data = await res.json();
        const names = data.map((place) => `${place.name}, ${place.state || place.country}`);
        setSuggestions(names);
      } catch (err) {
        console.error("Failed to fetch city suggestions:", err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [city]);

  const handleSuggestionClick = (selectedCity) => {
    setCity(selectedCity.split(",")[0]); // Only use city name
    setSuggestions([]);
    onSearch();
  };

  return (
    <div className="search-bar autocomplete">
      <input
        type="text"
        value={city}
        placeholder="Enter city or place in India"
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
