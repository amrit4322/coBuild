import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Form,
  Button,
  ProgressBar,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// COMPONENTS
import TransportMap from "./TransportMap";
import SchoolMap from "./SchoolMap";
import DevelopmentImpactCalculator from "./DevelopmentImpactCalculator";
import HousingHeatMap from "./HeatMapHousing";
import ServicesHeatMap from "./HeatMapServices";
import SentimentAnalysis from "./SentimentAnalysis";

// DATA
import permitsData from "../data/permitsummary.json";
import schoolsData from "../data/schools.json";
import transportData from "../data/transportfile.json";

import { FaBuilding, FaChartLine, FaMapMarkedAlt, FaUsers, FaArrowRight, FaGlobe, FaRocket, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import suburbsData from "../data/suburbs.json";

// 🔥 Fake metric calculation (demo-ready)
function calculateMetrics(year, permits, schools, transport) {
  // Just create some dynamic percentages based on year difference
  const yearFactor = (year - 2025) / 25; // normalized factor 0 → 1
  const totalPermits = permits.length;
  const totalSchools = schools.length;
  const totalTransport = Object.keys(transport).length;

  return {
    housing: Math.min(100, 50 + yearFactor * 50), // increases with year
    schools: Math.min(100, 60 + yearFactor * 30), // schools capacity metric
    transport: Math.min(100, 40 + yearFactor * 60),
    services: Math.min(100, 55 + yearFactor * 35),
  };
}

export default function Dashboard2() {
  const [selectedMap, setSelectedMap] = useState("schools"); // ✅ Default to "schools"
  const [year, setYear] = useState(2025);
  const [metrics, setMetrics] = useState({
    housing: 0,
    schools: 0,
    transport: 0,
    services: 0,
  });
  const [state, setState] = useState("Victoria");
  const [suburb, setSuburb] = useState("Burwood");
  const navigate = useNavigate();

  // 🔥 Recalculate metrics whenever year changes
  useEffect(() => {
    const newMetrics = getRandomMetrics();
    setMetrics(newMetrics);
  }, [suburb]);

  useEffect(() => {
    const newMetrics = calculateMetrics(year, permitsData, schoolsData, transportData);
    setMetrics(newMetrics);
  }, [year]);

  // Suburbs list for current state
  const suburbsList = suburbsData[state] || [];

  const getRandomMetrics = () => {
    return {
      housing: Math.floor(Math.random() * 40) + 40, // 40-80%
      schools: Math.floor(Math.random() * 40) + 50, // 50-90%
      transport: Math.floor(Math.random() * 50) + 30, // 30-80%
      services: Math.floor(Math.random() * 50) + 30, // 30-80%
    };
  };


  // 🔥 Decide which map to render
  const renderMap = () => {
    switch (selectedMap) {
      case "schools":
        return <SchoolMap year={year} schoolsData={schoolsData} />;
      case "transport":
        return <TransportMap year={year} transportData={transportData} />;
      case "housing":
        return <HousingHeatMap year={year} permitsData={permitsData} />;
      case "services":
        return <ServicesHeatMap year={year} />;
      default:
        return <SchoolMap year={year} schoolsData={schoolsData} />;
    }
  };

  // 🔥 Convert metrics object into array for easy rendering
  const metricsArray = [
    { title: "🏠 Housing", value: metrics.housing, color: "success", key: "housing" },
    { title: "🏫 Schools", value: metrics.schools, color: "warning", key: "schools" },
    { title: "🚌 Transport", value: metrics.transport, color: "info", key: "transport" },
    { title: "🏥 Services", value: metrics.services, color: "danger", key: "services" },
  ];

  return (
   <Container fluid className="p-4 bg-light" style={{ marginTop: "80px" }}>
      {/* HEADER */}
      {/* HEADER */}
     <Navbar expand="lg" className="navbar-enhanced" bg="white" variant="light" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-enhanced">
            <div className="brand-icon-wrapper">
              <FaBuilding className="brand-icon" />
            </div>
            <span className="brand-text">CoBuild</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="nav-enhanced">
              <Nav.Link as={Link} to="/" className="nav-link-enhanced">Home</Nav.Link>
            
             
          
            </Nav>
           
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MAIN DASHBOARD */}
      <Row>
        <div className="d-flex gap-2">
            {/* State Dropdown */}
            <Form.Select
              style={{ maxWidth: "200px" }}
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setSuburb(suburbsData[e.target.value][0]); // auto-select first suburb
              }}
            >
              {Object.keys(suburbsData).map((stateName, i) => (
                <option key={i} value={stateName}>
                  {stateName}
                </option>
              ))}
            </Form.Select>

            {/* Suburb Dropdown */}
            <Form.Select
              style={{ maxWidth: "200px" }}
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
            >
              {suburbsList.map((suburbName, i) => (
                <option key={i} value={suburbName}>
                  {suburbName}
                </option>
              ))}
            </Form.Select>
          </div>
      </Row>
      <Row>
        {/* LEFT SIDE: MAP + CALCULATOR */}
        <Col lg={8}>
          {/* MAP SECTION */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>🗺️ {suburb} Council Area Capacity Map</Card.Title>
              <div className="my-3">
                <Form.Label>📅 Data Year Selection</Form.Label>
                <Form.Range
                  min="2025"
                  max="2050"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                />
                <small className="text-muted">
                  Current Year: {year} | Showing: Projected Data
                </small>
              </div>

              <div
                style={{
                  height: "100%",
                  background: "#ddd",
                  borderRadius: "10px",
                  textAlign: "center",
                  lineHeight: "400px",
                  fontWeight: "bold",
                }}
              >
                {renderMap()}
              </div>
              
            </Card.Body>
          </Card>

          {/* PLANNING CALCULATOR */}
          <DevelopmentImpactCalculator />
        </Col>

        {/* RIGHT SIDE: METRICS PANEL */}
        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>📊 Live Capacity Metrics</Card.Title>
              {metricsArray.map((m, i) => (
                <Card
                  key={i}
                  className={`mb-3 shadow-sm ${selectedMap === m.key ? "border-primary" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedMap(m.key)}
                >
                  <Card.Body>
                    <Card.Subtitle>{m.title}</Card.Subtitle>
                    <ProgressBar
                      className="mt-2"
                      now={m.value}
                      label={`${m.value.toFixed(0)}%`}
                      variant={m.color}
                    />
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SENTIMENT SECTION */}
      <SentimentAnalysis />

      {/* FEASIBILITY SECTION */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title>🎯 Overall Project Feasibility</Card.Title>
          <div className="text-center">
            <div
              className="fw-bold fs-2 badge bg-success mt-3"
              style={{ padding: "20px" }}
            >
              HIGH
            </div>
          </div>
          <Row className="mt-4">
            <Col md={6}>
              <h5>Key Factors</h5>
              <ListGroup>
                <ListGroup.Item>Good housing availability</ListGroup.Item>
                <ListGroup.Item>Strong transport infrastructure</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <h5>Recommendations</h5>
              <ListGroup>
                <ListGroup.Item>Add more schools by 2028</ListGroup.Item>
                <ListGroup.Item>Increase parkland zones</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Button
              variant="primary"
              className="me-2"
              onClick={() => navigate("/report")}
            >
              📄 Generate Report
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
