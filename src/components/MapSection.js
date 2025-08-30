import React from "react";
import { Card, Form } from "react-bootstrap";

export default function MapSection() {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title>🗺️ Council Area Capacity Map</Card.Title>
        <div className="my-3">
          <Form.Label>📅 Data Year Selection</Form.Label>
          <Form.Range min="2024" max="2035" defaultValue="2025" />
          <small className="text-muted">Current Year: 2025 | Showing: Current Data</small>
        </div>
        <div
          style={{
            height: "400px",
            background: "#ddd",
            borderRadius: "10px",
            textAlign: "center",
            lineHeight: "400px",
            fontWeight: "bold",
          }}
        >
          Map Placeholder
        </div>
      </Card.Body>
    </Card>
  );
}
