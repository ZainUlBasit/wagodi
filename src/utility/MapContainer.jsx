// import React, { useState, useEffect } from "react";
// import MapPicker from "react-google-map-picker";

// const DefaultZoom = 10;

// const LocationPicker = ({ receive_address }) => {
//   const [location, setLocation] = useState(null);
//   const [zoom, setZoom] = useState(DefaultZoom);
//   const [address, setAddress] = useState("");

//   useEffect(() => {
//     fetchCurrentLocation();
//   }, []);

//   async function fetchCurrentLocation() {
//     try {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((pos) => {
//           const coords = pos.coords;
//           setLocation({ lat: coords.latitude, lng: coords.longitude });
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching current location:", error);
//     }
//   }

//   async function fetchAddress(lat, lng) {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCn3iFUNjO37dPrLUYkJLxW_Iqxcuojq_A`
//       );
//       const data = await response.json();
//       const formattedAddress = data.results[0].formatted_address;
//       console.log(data.results[0]);
//       setAddress(formattedAddress);
//     } catch (error) {
//       console.error("Error fetching address:", error);
//     }
//   }

//   function handleChangeLocation(lat, lng) {
//     setLocation({ lat: lat, lng: lng });
//     fetchAddress(lat, lng);
//   }

//   function handleChangeZoom(newZoom) {
//     setZoom(newZoom);
//   }

//   return (
//     <div>
//       {location && (
//         <>
//           <MapPicker
//             defaultLocation={location}
//             zoom={zoom}
//             mapTypeId="roadmap"
//             style={{ height: "200px" }}
//             onChangeLocation={handleChangeLocation}
//             onChangeZoom={handleChangeZoom}
//             apiKey="AIzaSyCn3iFUNjO37dPrLUYkJLxW_Iqxcuojq_A"
//           />
//           <p>Selected Address: {address}</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default LocationPicker;
