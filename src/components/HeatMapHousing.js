import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import schoolsData from "../data/schools.json"; // still using schools as proxy

function HeatmapLayerHousing({ year }) {
  const map = useMap();

  React.useEffect(() => {
    // Normalize year to a factor (2025 → 2050) between 0 and 1
    const yearFactor = Math.min((year - 2025) / 25, 1);

    // Decide how many points to show based on year
    const totalSchools = schoolsData.length;
    const visibleCount = Math.floor(totalSchools * (0.3 + yearFactor * 0.7)); // show 30% initially → 100%

    const visibleSchools = schoolsData.slice(0, visibleCount);

    // Create weighted heatmap points
    const points = visibleSchools.map((school) => {
      const demandRatio = school.Enrolments_2025 / school.Capacity; // occupancy ratio
      const weight = Math.min(1, demandRatio + yearFactor * 0.2); // boost with year
      return [school.Latitude, school.Longitude, weight];
    });

    // Create heat layer
    const heatLayer = L.heatLayer(points, {
      radius: 35,
      blur: 25,
      maxZoom: 14,
      gradient: {
        0.2: "green",
        0.4: "yellow",
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

export default function HousingHeatMap({ year = 2025 }) {
  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[-37.8136, 144.9631]} // Melbourne
        zoom={11} // Slight zoom in
        style={{ height: "500px", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <HeatmapLayerHousing year={year} />
      </MapContainer>
      <div className="d-flex justify-content-around mt-3">
        <span className="badge bg-success">Well-Serviced</span>
        <span className="badge bg-warning text-dark">Strained Services</span>
        <span className="badge bg-danger">Overcrowded</span>
      </div>
    </div>
  );
}
