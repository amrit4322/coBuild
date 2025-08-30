import React from "react";
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

export default function Dashboard2() {
  return (
    <Container fluid className="p-4 bg-light">
      {/* HEADER */}
      <Navbar bg="white" className="shadow-sm rounded p-3 mb-4">
        <Container className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold text-primary mb-0">CoBuild</h1>
            <small className="text-muted">Building Communities Together</small>
          </div>
          <Form.Select style={{ maxWidth: "250px" }}>
            <option value="yarra">City of Yarra</option>
            <option value="moreland">City of Moreland</option>
            <option value="portphillip">City of Port Phillip</option>
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
              <div className="my-3">
                <Form.Label>📅 Data Year Selection</Form.Label>
                <Form.Range min="2024" max="2035" defaultValue="2025" />
                <small className="text-muted">
                  Current Year: 2025 | Showing: Current Data
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
                <TransportMap/>
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
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>🧮 Development Impact Calculator</Card.Title>
              <Row className="gy-3 mt-3">
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Number of New Houses</Form.Label>
                    <Form.Control type="number" defaultValue={500} />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Target Year</Form.Label>
                    <Form.Select>
                      <option>2026</option>
                      <option>2027</option>
                      <option>2028</option>
                      <option>2029</option>
                      <option>2030</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button className="w-100" variant="primary">
                    Calculate
                  </Button>
                </Col>
              </Row>
              <Card className="mt-4 p-3 bg-light">
                <h5>📋 Infrastructure Requirements:</h5>
                <ListGroup className="mt-2">
                  <ListGroup.Item>Example requirement</ListGroup.Item>
                  <ListGroup.Item>Another requirement</ListGroup.Item>
                </ListGroup>
                <div className="alert alert-danger mt-3 mb-0">
                  ⚠️ Alert: Example alert message
                </div>
              </Card>
            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT SIDE: METRICS PANEL */}
        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>📊 Live Capacity Metrics</Card.Title>
              {[
                { title: "🏠 Housing", now: 65, color: "success" },
                { title: "🏫 Schools", now: 92, color: "warning" },
                { title: "🚌 Transport", now: 45, color: "info" },
                { title: "🏥 Services", now: 78, color: "danger" },
              ].map((m, i) => (
                <Card key={i} className="mb-3 shadow-sm">
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
      <Card className="shadow-sm mb-4">
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
      </Card>

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
