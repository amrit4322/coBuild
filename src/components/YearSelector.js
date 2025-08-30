import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function YearSelector() {
  const [selectedYear, setSelectedYear] = useState(2025); // Start year

  return (
    <div>
      <Form.Label>📅 Data Year Selection</Form.Label>
      <Form.Range
        min="2025"
        max="2050"
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      />
      <small className="text-muted">
        Current Year: {selectedYear} | Showing: {selectedYear === 2025 ? "Current Data" : "Projected Data"}
      </small>
    </div>
  );
}
