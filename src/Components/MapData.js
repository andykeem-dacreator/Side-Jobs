// import React, { useState, useMemo } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";

// // require("dotenv").config();

// const MapData = () => {
//   const { tasks } = useSelector((state) => state);
//   const { id } = useParams();
//   const [activeMarker, setActiveMarker] = useState(null);
//   const task = tasks.find((task) => task.id === id);
//   const { isLoaded } = useLoadScript({
//     apiKey: process.env.REACT_APP_API_KEY,
//   });
//   const handleMarkerClick = (marker) => {
//     setActiveMarker(marker);
//   };
//   const center = useMemo(
//     () => ({ lat: parseFloat(task.lat), lng: parseFloat(task.lng) }),
//     []
//   );

//   if (!task) {
//     return null;
//   }
//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
//       <Marker position={center} />
//     </GoogleMap>
//   );
// };

// export default MapData;

import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const MapData = () => {
  const { tasks } = useSelector((state) => state);
  const { id } = useParams();
  const [activeMarker, setActiveMarker] = useState(null);
  const task = tasks.find((task) => task.id === id);
  const { isLoaded, loadError } = useLoadScript({
    apiKey: process.env.REACT_APP_API_KEY,
  });
  const [googleMap, setGoogleMap] = useState(null);

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  const center = useMemo(
    () => ({ lat: parseFloat(task.lat), lng: parseFloat(task.lng) }),
    []
  );

  useEffect(() => {
    if (isLoaded) {
      setGoogleMap(
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="map-container"
        >
          <Marker position={center} />
        </GoogleMap>
      );
    }
  }, [isLoaded, center]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!task) {
    return null;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return googleMap;
};

export default MapData;
