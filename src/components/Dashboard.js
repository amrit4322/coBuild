import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
  ProgressBar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ backgroundColor: "#1a1a1a", color: "#e0e0e0", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <Navbar expand="lg" style={{ borderBottom: "1px solid #444" }}>
        <Container>
          <Navbar.Brand href="/" className="text-light fw-bold d-flex align-items-center gap-2">
            <svg width="32" height="32" fill="#38e07b" viewBox="0 0 48 48">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
              />
            </svg>
            Planwise
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto">
                <Nav.Link as={Link} to="/cobuild" className="text-secondary">
                    Home
                </Nav.Link>
              <Nav.Link as={Link} to="/map" className="text-secondary">
                    Map
                </Nav.Link>
              <Nav.Link  as={Link} to="/report" className="text-secondary">Reports</Nav.Link>
              
            </Nav>
            <div
              className="rounded-circle"
              style={{
                width: "40px",
                height: "40px",
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoUppaJZpJGDLu-aqVA5YevimxgYOLi1mVoLIvjFnmNygrU9SSES9cWgidBWTv8B1aosgx2_rZRccsvZTmAL_x-opkl58y1BY47EGnB7nFk8hbptICAI5dP6VCb-_Auo6PN8nIP9GQJKX4XsjfwGqqVFi7DaAHMpGjkLaKRw750-2H-XcGXGOlgGWBzC0Nk66DqLY1E2KKeke7Clsue4acOzx6djhthgproPQwR9yItvhM-voei6NeTrHOnf-f4uc9B5uCrY0pmPI')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="py-4">
        <Row>
          {/* FILTER SIDEBAR */}
          <Col md={3}>
            <Card className="bg-dark text-light border-secondary mb-4">
              <Card.Body>
                <Card.Title>Filters</Card.Title>
                <ListGroup variant="flush">
                  {["Housing Stress", "Rental Affordability", "Transport Access", "Crime Data"].map((filter, idx) => (
                    <ListGroup.Item
                      key={idx}
                      className="bg-dark text-light border-0 d-flex align-items-center"
                    >
                      <Form.Check type="checkbox" label={filter} />
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="mt-4">
                  <p className="fw-bold">Year Selection</p>
                  <Form.Range min={2025} max={2030} defaultValue={2027} />
                  <div className="d-flex justify-content-between text-secondary">
                    <span>2025</span>
                    <span>2030</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* MAIN DASHBOARD */}
          <Col md={9}>
            <h3 className="fw-bold mb-3">Victorian Housing and Infrastructure Dashboard</h3>

            {/* Map */}
            <Card className="mb-4 border-0 shadow">
              <div
                style={{
                  height: "400px",
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvliAIp9Ga6EJU8iURY_WbBzcvKjo_JqdH8ntYB-C1acfiRKIxmw8AjhjvuPHsFgb0a3NbDQKNCO2UeCSbDIhQSbKfu0mmyrscYgy1u7S_NyYGDLzaX-vwlVN07GyufJbxjWC0MeDxbUTD5XNA1oEdZkVxyc742KRtMFtq2bcUN6DsvrfBVn3-ClLfvcpR91EbOG-eOG19SpbYZjSe5ZYTecoaKauXsgKrl6QMfDwsQPhLxkztvioYShBfv0xQFcN6vc0h6ASAjtg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="rounded"
              ></div>
            </Card>

            {/* Simulation Panel */}
            <Card className="mb-4 bg-dark text-light border-secondary">
              <Card.Body>
                <Card.Title>Simulation Panel</Card.Title>
                <Row>
                  <Col md={4}>
                    <Form.Label>Population Growth</Form.Label>
                    <Form.Range min={0} max={10} defaultValue={5} />
                    <span className="text-info">5%</span>
                  </Col>
                  <Col md={4}>
                    <Form.Label>Housing Development</Form.Label>
                    <Form.Range min={0} max={10} defaultValue={2} />
                    <span className="text-info">2%</span>
                  </Col>
                  <Col md={4}>
                    <Form.Label>School Capacity</Form.Label>
                    <Form.Range min={0} max={100} defaultValue={80} />
                    <span className="text-info">80%</span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Analytics Panel */}
            <h4 className="fw-bold mt-4 mb-3">Analytics Panel</h4>
            <Row>
              <Col md={6}>
                <Card className="text-white border-0 shadow-lg mb-4">
                  <Card.Body
                    style={{
                      height: "200px",
                      background:
                        "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBn_uYvbwDOcOBUpMAT-6Z8llIKN5D5bwjpbXqk-Og2q1ypqajBw_kZZnNJ9t2RmTn-65r1BdgsfB5LLKpIlGOo6jFK50jogyFqlgu69B_ImFh5Pce2fossbOYSvBmuRC2PXxQznlczdSWLQjrlcwdBSMvfz4WxQRg-EHZF_6K18rOw_HgzlRlQV61BxxqqKYOfhuHWxkGEFQBc7B4aEeO54ab0h1wHQ5uq_dryF9knV06CX06qMJ1GR9hTXvgVYDUGMUYqOa-e2h4')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Card.Title>Top 5 Most Overcrowded Suburbs</Card.Title>
                    <Card.Text>1. Suburb A, 2. Suburb B, 3. Suburb C...</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-dark text-light border-secondary mb-4">
                  <Card.Body>
                    <p className="text-secondary mb-1">Rent Price Trend</p>
                    <h3 className="fw-bold">$450/week</h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-secondary">2025-2030</span>
                      <span className="text-success">+5%</span>
                    </div>
                    <ProgressBar now={65} variant="success" className="mt-3" />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12}>
                <Card className="text-white border-0 shadow-lg">
                  <Card.Body
                    style={{
                      height: "200px",
                      background:
                        "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIXobpqtMyEgcPFsFYGDD8hsb0QKxvsbpb9jeOk7i5NSEwOADRYDxYtzLcIfLfJRlNBK7XZP88RdMaxqQ8J5KLIvDUPGdZ-wtf9E0HlxCuTsRsqk3mBf3jvOkiYWUe2klSb2FJz_uZ5GzSdbzbsLlI33HrxKFwJEhjzgMtOWHllwDZ1teVqhOiwhfJO_fnNtt7XfBEtgF5x9H9cTe7hiAC-NZoT1ztuAdCXfKpOLhyBK0_XfEzhuj9V79YWCWjxW0Taat1nWZSiGc')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Card.Title>Infrastructure Strain Forecast</Card.Title>
                    <Card.Text>High strain expected in Suburb X & Y by 2030</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
