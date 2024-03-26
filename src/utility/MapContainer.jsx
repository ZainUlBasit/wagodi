import React, { useState, useEffect } from "react";
import MapPicker from "react-google-map-picker";

const DefaultZoom = 10;

const LocationPicker = ({ recieve_addreess }) => {
  const [location, setLocation] = useState(null);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  async function fetchCurrentLocation() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          setLocation({ lat: coords.latitude, lng: coords.longitude });
        });
      }
    } catch (error) {
      console.error("Error fetching current location:", error);
    }
  }

  useEffect(() => {
    if (location) {
      fetchAddress();
    }
  }, [location]);

  async function fetchAddress() {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyCn3iFUNjO37dPrLUYkJLxW_Iqxcuojq_A`
      );
      const data = await response.json();
      const formattedAddress = data.results[0].formatted_address;
      setAddress(formattedAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  }

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  return (
    <div>
      {location && (
        <MapPicker
          defaultLocation={location}
          zoom={zoom}
          mapTypeId="roadmap"
          style={{ height: "200px" }}
          onChangeLocation={handleChangeLocation}
          onChangeZoom={handleChangeZoom}
          apiKey="AIzaSyCn3iFUNjO37dPrLUYkJLxW_Iqxcuojq_A"
        />
      )}
      {/* <p>Selected Location:</p>
      <p>Latitude: {location ? location.lat : ""}</p>
      <p>Longitude: {location ? location.lng : ""}</p>
      <p>Address: {address}</p> */}
    </div>
  );
};

export default LocationPicker;
