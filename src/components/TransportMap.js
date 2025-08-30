import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import transportData from "../data/transportfile.json";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const center = [-37.8136, 144.9631]; // Melbourne

// Transport line colors
const getColor = (mode) => {
  switch (mode) {
    case "Train":
      return "#4285F4"; // Blue
    case "Tram":
      return "#34A853"; // Green
    default:
      return "#FF0000"; // Red fallback
  }
};

export default function TransportMap({ year = 2025 }) {
  // Calculate year factor (0 for 2025, 1 for 2050)
  const yearFactor = (year - 2022) / 25;

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "500px", width: "100%", borderRadius: "10px" }}
    >
      {/* Map tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
      />

      {/* Transport Data */}
      {Object.keys(transportData).map((regionKey) => {
        const region = transportData[regionKey];

        // Dynamically determine number of stops & lines based on year
        const totalStops = region.stops.length;
        const totalLines = region.lines.length;

        const visibleStops = region.stops.slice(
          0,
          Math.floor(totalStops * (0.3 + yearFactor * 0.7)) // Start with 30% → 100%
        );
        const visibleLines = region.lines.slice(
          0,
          Math.floor(totalLines * (0.3 + yearFactor * 0.7)) // Start with 30% → 100%
        );

        return (
          <React.Fragment key={regionKey}>
            {/* Stops */}
            {visibleStops.map((stop) => (
              <Marker key={stop.stop_id} position={[stop.lat, stop.lon]}>
                <Popup>{stop.stop_name}</Popup>
              </Marker>
            ))}

            {/* Lines */}
            {visibleLines.map((line) => (
              <Polyline
                key={line.feature_id}
                positions={[
                  [line.start_lat, line.start_lon],
                  [line.end_lat, line.end_lon],
                ]}
                pathOptions={{
                  color: getColor(line.mode),
                  weight: 4,
                  opacity: 0.8,
                }}
              />
            ))}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}
