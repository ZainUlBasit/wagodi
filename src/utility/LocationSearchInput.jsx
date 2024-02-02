import React, { useState } from "react";

const LocationSearchInput = () => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [Lat, setLat] = useState("");
  const [Lon, setLon] = useState("");

  const handleChange = async (newAddress) => {
    setAddress(newAddress);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          newAddress
        )}`
      );
      const data = await response.json();

      setSuggestions(data || []);
    } catch (error) {
      console.error("Error searching for address:", error);
      setSuggestions([]);
    }
  };

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    setSuggestions([]);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          selectedAddress
        )}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const selectedLocation = data[0];
        console.log("Selected Address:", selectedAddress);
        console.log("Latitude:", selectedLocation.lat);
        console.log("Longitude:", selectedLocation.lon);
        setLat(selectedLocation.lat);
        setLon(selectedLocation.lon);
      } else {
        console.error("No data found for the selected address");
      }
    } catch (error) {
      console.error("Error getting coordinates:", error);
    }
  };

  return (
    <div className="relative w-[400px]">
      {Lat !== "" && `Latitude: ${Lat}`}
      <br />
      {Lon !== "" && `Longitude: ${Lon}`}
      <input
        type="text"
        value={address}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search Places ..."
        className="w-full py-2 px-2 outline-none border-[2px] border-black rounded-[10px]"
      />
      <div className="autocomplete-dropdown-container w-full overflow-hidden flex flex-col gap-y-1 absolute z-20 bg-white px-2">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.place_id}
            onClick={() => handleSelect(suggestion.display_name)}
            className="cursor-pointer whitespace-nowrap"
          >
            <span>{suggestion.display_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchInput;
