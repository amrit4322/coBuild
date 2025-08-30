import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MapDashboard() {
  return (
    <div style={{ backgroundColor: "#121212", color: "#e0e0e0", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <Navbar expand="lg" className="border-bottom" style={{ borderColor: "#1a4d2e" }}>
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
          <Navbar.Toggle aria-controls="dashboard-navbar" />
          <Navbar.Collapse id="dashboard-navbar">
            <Nav className="mx-auto">
                <Nav.Link as={Link} to="/" className="text-secondary">
                    Home
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard" className="text-secondary">
                    Dashboard
                </Nav.Link>
                
               
            </Nav>
            <div
              className="rounded-circle"
              style={{
                width: "40px",
                height: "40px",
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBCUtF-KqgYPNWtQGGqW-qyAQH84oKE8lCVtUNIrkZUYFJ1LRQwatj2TBK4dv2uWa5ckDSzY4_9hUwv3_ObHurhGS_X4ZPmEqEzuYSS4NAOlcMP6B4SR07P3mIR20Rn5dQK673SsX-z4aqNyTVEQ2Ox83UM872bE3MOu9-EDxPWRwrDBuB1UzTmAYa8fj8zmRtaU27_M4edAifnQHfGy9uk6d_VS8vxRJ7bFzOkMA4hmtLmtaBAOabvnwrIDo82fw87XtiZxcaTp-I')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MAIN DASHBOARD */}
      <Container fluid className="py-4">
        <Row>
          {/* SIDEBAR */}
          <Col md={3} className="border-end" style={{ borderColor: "#1a4d2e" }}>
            <div className="mb-4">
              <Form.Control
                type="text"
                placeholder="Find a suburb..."
                className="bg-dark text-light border-2"
                style={{ borderColor: "#1a4d2e" }}
              />
            </div>
            <h4 className="fw-bold mb-3">Metrics</h4>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent text-light border-0">
                <Form.Check
                  type="radio"
                  label="Population Density"
                  name="metric"
                  defaultChecked
                />
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent text-light border-0">
                <Form.Check type="radio" label="Housing Stress Level" name="metric" />
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent text-light border-0">
                <Form.Check type="radio" label="Planned Building Permits" name="metric" />
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent text-light border-0">
                <Form.Check type="radio" label="School Capacity Utilization" name="metric" />
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent text-light border-0">
                <Form.Check type="radio" label="Transport Coverage" name="metric" />
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* MAP + LEGEND */}
          <Col md={9} className="p-4">
            <h3 className="fw-bold mb-4">Victorian Suburbs Overview</h3>
            <div
              className="rounded"
              style={{
                height: "500px",
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFdKIVUnw7T14M7gaYX2rrpNv2opAwEPtDU8bBQ3I37-SziZc96JqLgQktsfiyF80ub_8om39WIXgqfSKrL7ax0jacCgPl-5DUyx6HlS8qbgQg0vN94R1UO-n5K7vC6jPp9rMcdzzIm_Lc82r5S0jLOroNBrNcNc8OnNpZaWPk0RdXRRs5FH_fHji5s_UCni4ZAqxkeK87m9wef10M5X2_TshOB8AaSpYJFgeYLIZWMdYj8RHPY-gBHx8r9SCgH5utPhMa20TjYNg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              {/* Legend */}
              <div
                className="position-absolute p-3 rounded"
                style={{
                  bottom: "20px",
                  left: "20px",
                  backgroundColor: "rgba(18,18,18,0.85)",
                }}
              >
                <h5 className="fw-bold mb-3">Housing Stress Legend</h5>
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle bg-danger me-2" style={{ width: "16px", height: "16px" }}></div>
                  <span>High stress / overcrowding</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="rounded-circle bg-warning me-2" style={{ width: "16px", height: "16px" }}></div>
                  <span>Medium stress</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-success me-2" style={{ width: "16px", height: "16px" }}></div>
                  <span>Balanced / low stress</span>
                </div>
              </div>

              {/* Controls */}
              <div className="position-absolute d-flex flex-column gap-2" style={{ bottom: "20px", right: "20px" }}>
                <Button variant="dark" className="rounded-circle border">
                  <span className="material-symbols-outlined">add</span>
                </Button>
                <Button variant="dark" className="rounded-circle border">
                  <span className="material-symbols-outlined">remove</span>
                </Button>
                <Button variant="dark" className="rounded-circle border">
                  <span className="material-symbols-outlined">near_me</span>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
