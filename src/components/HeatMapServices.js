import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import schoolsData from "../data/schools.json";

function HeatmapLayerServices({ year }) {
  const map = useMap();

  React.useEffect(() => {
    const yearFactor = (year - 2025) / 25; // scale 0 → 1 between 2025-2050
    const totalSchools = schoolsData.length;
    const visibleCount = Math.floor(totalSchools * (0.3 + yearFactor * 0.7)); // 30%-100% schools
    const visibleSchools = schoolsData.slice(0, visibleCount);

    const points = visibleSchools.map((school) => {
      const ratio = school.Enrolments_2025 / school.Capacity;
      const weight = Math.min(1, ratio + 0.2); // scale intensity
      return [school.Latitude, school.Longitude, weight];
    });

    const heatLayer = L.heatLayer(points, {
      radius: 40,
      blur: 25,
      maxZoom: 14,
      gradient: {
        0.2: "blue",
        0.4: "purple",
        0.6: "orange",
        0.8: "red",
      },
    });

    heatLayer.addTo(map);
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, year]);

  return null;
}

export default function ServicesHeatMap({ year = 2025 }) {
  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[-37.8136, 144.9631]}
        zoom={11} // zoom in slightly
        style={{ height: "500px", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <HeatmapLayerServices year={year} />
      </MapContainer>
      <div className="d-flex justify-content-around mt-3">
        <span className="badge" style={{ backgroundColor: "#3498DB" }}>Well-Serviced</span>
        <span className="badge" style={{ backgroundColor: "#9B59B6" }}>Adequate Services</span>
        <span className="badge" style={{ backgroundColor: "#E67E22" }}>Strained Services</span>
        <span className="badge" style={{ backgroundColor: "#E74C3C" }}>Critical Gaps</span>
      </div>
    </div>
  );
}
