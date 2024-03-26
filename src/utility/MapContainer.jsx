import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { GOOGLE_API_KEY } from "../assets/config";
import { MdLocationPin } from "react-icons/md";

const Marker = ({ lat, lng }) => (
  <div
    style={{
      color: "red",
      fontSize: "35px",
      marginTop: "-35px",
      marginLeft: "-14px",
    }}
  >
    <MdLocationPin />
  </div>
);

export default function MapContainer({
  SearchLan,
  SearchLat,
  setLongitude,
  setLatitude,
  setAddress,
}) {
  const [center, setCenter] = useState({
    lat: 10.99835602,
    lng: 77.01502627,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user's current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (SearchLat && SearchLan) {
      setCenter({ lat: SearchLat, lng: SearchLan });
    }
  }, [SearchLat, SearchLan]);

  const handleMapClick = ({ lat, lng }) => {
    setLatitude(lat);
    setLongitude(lng);
    fetchAddress(lat, lng);
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        // const formattedAddress = data.results[0].formatted_address;
        // console.log(data.results[0].formatted_address);
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };

  return (
    <div style={{ height: "200px", width: "297px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={center}
        defaultZoom={11}
        onClick={handleMapClick}
        options={{
          fullscreenControl: false,
        }}
      >
        <Marker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
}
