import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import schoolsData from "../data/schools.json";

function HeatmapLayerServices() {
  const map = useMap();

  React.useEffect(() => {
    const points = schoolsData.map((school) => [
      school.Latitude,
      school.Longitude,
      0.5 // Same weight for all schools
    ]);

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
  }, [map]);

  return null;
}

export default function ServicesHeatMap() {
  return (
    <MapContainer
      center={[-37.8136, 144.9631]}
      zoom={10}
      style={{ height: "500px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <HeatmapLayerServices />
    </MapContainer>
  );
}
