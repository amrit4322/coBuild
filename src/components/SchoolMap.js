import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import schoolsData from "../data/schools.json"; // Your JSON file

// Fix Leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Create a custom Leaflet Icon with a color
const getMarkerIcon = (color = "#2E86DE") => {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 48">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 32 16 32s16-20 16-32C32 7.16 24.84 0 16 0z" fill="${color}"/>
      <circle cx="16" cy="16" r="7" fill="white"/>
    </svg>
  `);

  return new L.Icon({
    iconUrl: `data:image/svg+xml;utf8,${svg}`,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -28],
  });
};

const center = [-37.8136, 144.9631]; // Melbourne

// A small hook to track zoom level
function ZoomWatcher({ setZoom }) {
  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });
  return null;
}

export default function SchoolMap() {
  const [zoom, setZoom] = useState(10);

  // Only show all schools if zoomed in close
  const visibleSchools = zoom < 12 ? schoolsData.slice(0, 50) : schoolsData;

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "500px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <ZoomWatcher setZoom={setZoom} />

      {visibleSchools.map((school, i) => (
        <Marker
          key={i}
          position={[school.Latitude, school.Longitude]}
          icon={getMarkerIcon(
    school.Enrolments_2025 / school.Capacity > 0.91
      ? "#E74C3C" // red if over 90% capacity
      : "#2ECC71" // green otherwise
  )}
        >
          <Popup>
            <strong>{school.School_Name}</strong>
            <br />
            {school.School_Type} in {school.LGA_Name}
            <br />
            Enrolments: {school.Enrolments_2025} / {school.Capacity}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
