import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import schoolsData from "../data/schools.json";

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

// 🔥 Custom Icon Function
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

// 🔥 Force map to re-render fully on load
function RefreshMap() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export default function SchoolMap({ year = 2025 }) {
  const [zoom] = useState(11); // 🔥 Slight zoom increase for better view

  // 🔥 Dynamically control number of visible schools based on year
  const yearFactor = (year - 2025) / 25; // 0 → 1 between 2025 and 2050
  const totalSchools = schoolsData.length;
  const visibleCount = Math.floor(totalSchools * (0.2 + yearFactor * 0.8)); 
  // Start with 20% schools in 2025 → 100% by 2050
  const visibleSchools = schoolsData.slice(0, visibleCount);

  return (
    <div style={{ position: "relative" }}>
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "500px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <RefreshMap />

      {visibleSchools.map((school, i) => {
        const ratio = school.Enrolments_2025 / school.Capacity;
        let color = "#F1C40F"; // Default Yellow
        if (ratio > 0.91) color = "#E74C3C"; // 🔴 Over 90%
        else if (ratio < 0.906) color = "#2ECC71"; // 🟢 Below 40%

        return (
       
          <Marker
            key={i}
            position={[school.Latitude, school.Longitude]}
            icon={getMarkerIcon(color)}
          >
            <Popup>
              <strong>{school.School_Name}</strong>
              <br />
              {school.School_Type} in {school.LGA_Name}
              <br />
              Enrolments: {school.Enrolments_2025} / {school.Capacity}
            </Popup>
          </Marker>
          
          
        );
      })}
    </MapContainer>
    <div className="d-flex justify-content-around mt-3">
                <span className="badge bg-success">Growth Ready</span>
                <span className="badge bg-warning text-dark">Monitor Closely</span>
                <span className="badge bg-danger">Critical Load</span>
              </div>
          </div>
       
  );
}
