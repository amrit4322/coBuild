import React,{useState} from "react";
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
import TransportMap from "./TransportMap";
import SchoolMap from "./SchoolMap";
import DevelopmentImpactCalculator from "./DevelopmentImpactCalculator";
import CommunitySentiment from "./CommunitySentiment";
import YearSelector from "./YearSelector";
import HousingHeatMap from "./HeatMapHousing";
import ServicesHeatMap from "./HeatMapServices";

export default function Dashboard2() {
    const [selectedMap, setSelectedMap] = useState("transport"); // default map

  const renderMap = () => {
    switch (selectedMap) {
      case "transport":
        return <TransportMap />;
      case "schools":
        return <SchoolMap />;
      case "housing":
        return <HousingHeatMap />;
      case "services":
       return <ServicesHeatMap />;
      default:
        return <TransportMap />;
    }
  };

  const metrics = [
    { title: "🏠 Housing", now: 65, color: "success", key: "housing" },
    { title: "🏫 Schools", now: 92, color: "warning", key: "schools" },
    { title: "🚌 Transport", now: 45, color: "info", key: "transport" },
    { title: "🏥 Services", now: 78, color: "danger", key: "services" },
  ];

  return (
    <Container fluid className="p-4 bg-light">
      {/* HEADER */}
      <Navbar bg="white" className="shadow-sm rounded p-3 mb-4">
        <Container className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold text-primary mb-0">CoBuild</h1>
            <small className="text-muted">Building Communities Together</small>
          </div>
          <Form.Select style={{ maxWidth: "250px" }} defaultValue="vic">
            <option value="nsw">New South Wales</option>
            <option value="vic">Victoria</option>
            <option value="qld">Queensland</option>
            <option value="wa">Western Australia</option>
            <option value="sa">South Australia</option>
            <option value="tas">Tasmania</option>
            <option value="act">Australian Capital Territory</option>
            <option value="nt">Northern Territory</option>
          </Form.Select>
        </Container>
      </Navbar>

      {/* MAIN DASHBOARD */}
      <Row>
        {/* LEFT SIDE: MAP + CALCULATOR */}
        <Col lg={8}>
          {/* MAP SECTION */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>🗺️ Council Area Capacity Map</Card.Title>
              <YearSelector/>
            
              
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
              <div className="d-flex justify-content-around mt-3">
                <span className="badge bg-success">Low Demand</span>
                <span className="badge bg-warning text-dark">
                  Moderate Demand
                </span>
                <span className="badge bg-danger">High Demand</span>
              </div>
            </Card.Body>
          </Card>

          {/* PLANNING CALCULATOR */}
          <DevelopmentImpactCalculator/>
          
        </Col>

        {/* RIGHT SIDE: METRICS PANEL */}
        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>📊 Live Capacity Metrics</Card.Title>
              {metrics.map((m, i) => (
                <Card
                  key={i}
                  className={`mb-3 shadow-sm ${
                    selectedMap === m.key ? "border-primary" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedMap(m.key)}
                >
                  <Card.Body>
                    <Card.Subtitle>{m.title}</Card.Subtitle>
                    <ProgressBar
                      className="mt-2"
                      now={m.now}
                      label={`${m.now}%`}
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
      <CommunitySentiment />
      {/* <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title>👥 Community Sentiment Analysis</Card.Title>
          <Row className="mt-3">
            <Col md={3} className="text-center">
              <Card className="p-3">
                <h5>Satisfaction Score</h5>
                <h1 className="fw-bold text-primary">78%</h1>
                <small>123 responses</small>
              </Card>
            </Col>
            <Col md={9}>
              <Card className="p-3">
                <h5>Recent Feedback</h5>
                <ListGroup className="mt-2">
                  <ListGroup.Item>
                    "We need more green spaces in the community."
                  </ListGroup.Item>
                  <ListGroup.Item>
                    "Public transport has improved this year."
                  </ListGroup.Item>
                </ListGroup>
                <div className="mt-3 d-flex gap-2">
                  <Button size="sm" variant="primary">
                    View All Feedback
                  </Button>
                  <Button size="sm" variant="secondary">
                    Submit New Feedback
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card> */}

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
            <Button variant="primary" className="me-2">
              📄 Generate Report
            </Button>
            <Button variant="success" className="me-2">
              📊 Export Data
            </Button>
            <Button variant="secondary">📤 Share</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
