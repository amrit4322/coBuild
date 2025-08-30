import React, { useState } from "react";
import { Card, Row, Col, Form, Button, ListGroup, Alert } from "react-bootstrap";
import permitsData from "../data/permitsummary.json";

export default function DevelopmentImpactCalculator() {
  const [houses, setHouses] = useState(500);
  const [year, setYear] = useState(2026);
  const [result, setResult] = useState(null);

  const calculateImpact = () => {
    // Simple mock calc using first dataset entry
    const area = permitsData[0]; 
    const populationIncrease = area.projected_population_increase * (houses / 100);
    const primaryStudents = area.projected_primary_students * (houses / 100);
    const secondaryStudents = area.projected_secondary_students * (houses / 100);
    const totalCost = houses * area.avg_cost;

    const alerts = [];
    if (populationIncrease > 50) alerts.push("High population growth expected.");
    if (primaryStudents + secondaryStudents > 100) alerts.push("Schools may exceed capacity.");
    
    setResult({ populationIncrease, primaryStudents, secondaryStudents, totalCost, alerts });
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title>🧮 Development Impact Calculator</Card.Title>
        <Row className="gy-3 mt-3">
          <Col md={5}>
            <Form.Group>
              <Form.Label>Number of New Houses</Form.Label>
              <Form.Control
                type="number"
                value={houses}
                onChange={(e) => setHouses(Number(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group>
              <Form.Label>Target Year</Form.Label>
              <Form.Select value={year} onChange={(e) => setYear(e.target.value)}>
                {[2026, 2027, 2028, 2029, 2030].map((yr) => (
                  <option key={yr}>{yr}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button className="w-100" variant="primary" onClick={calculateImpact}>
              Calculate
            </Button>
          </Col>
        </Row>

        {result && (
          <Card className="mt-4 p-3 bg-light">
            <h5>📋 Infrastructure Requirements:</h5>
            <ListGroup className="mt-2">
              <ListGroup.Item>
                Estimated Population Increase: {result.populationIncrease.toFixed(0)}
              </ListGroup.Item>
              <ListGroup.Item>
                Additional Students: {result.primaryStudents + result.secondaryStudents}
              </ListGroup.Item>
              <ListGroup.Item>
                Estimated Development Cost: ${result.totalCost.toLocaleString()}
              </ListGroup.Item>
            </ListGroup>
            {result.alerts.length > 0 &&
              result.alerts.map((alert, i) => (
                <Alert key={i} variant="danger" className="mt-3 mb-0">
                  ⚠️ {alert}
                </Alert>
              ))}
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}
