import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

const metrics = [
  { title: "🏠 Housing", now: 65, color: "success" },
  { title: "🏫 Schools", now: 92, color: "warning" },
  { title: "🚌 Transport", now: 45, color: "info" },
  { title: "🏥 Services", now: 78, color: "danger" },
];

export default function MetricsPanel() {
  return (
    <div>
      <h4 className="fw-bold mb-3">📊 Live Capacity Metrics</h4>
      {metrics.map((metric, idx) => (
        <Card key={idx} className="mb-3 shadow-sm">
          <Card.Body>
            <Card.Title>{metric.title}</Card.Title>
            <ProgressBar now={metric.now} label={`${metric.now}%`} variant={metric.color} />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
