import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function YearSelector({ year, setYear }) {
  return (
    <div>
      <Form.Label>📅 Data Year Selection</Form.Label>
      <Form.Range
        min="2025"
        max="2050"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      />
      <small className="text-muted">
        Current Year: {year} | Showing: {year === 2025 ? "Current Data" : "Projected Data"}
      </small>
    </div>
  );
}
