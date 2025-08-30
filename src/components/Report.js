import React from "react";

import { Download } from "react-bootstrap-icons";
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

const ReportPage = () => {
  return (
    <div className="bg-dark text-light min-vh-100 py-4">
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
                <Nav.Link as={Link} to="/" className="text-secondary">
                    Home
                </Nav.Link>
              <Nav.Link as={Link} to="/map" className="text-secondary">
                    Map
                </Nav.Link>
              <Nav.Link  as={Link} to="/dashboard" className="text-secondary">Dashboard</Nav.Link>
              
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
      <Container fluid="lg">
        {/* Header Section */}
        <Row className="align-items-center mb-4">
          <Col md={8}>
            <h1 className="fw-bold">Comprehensive Report</h1>
            <p className="text-secondary">
              Generated from Dashboard Data &amp; Projections
            </p>
          </Col>
          <Col md={4} className="text-md-end mt-3 mt-md-0">
            <Button variant="success" className="fw-bold">
              <Download className="me-2" />
              Download Report
            </Button>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Left Column - Key Metrics + Summary */}
          <Col lg={4}>
            <Card bg="dark" text="light" className="border-secondary mb-4">
              <Card.Body>
                <Card.Title className="text-success fw-bold">
                  Key Metrics
                </Card.Title>
                <div className="mt-3">
                  <h6 className="text-secondary">Population Growth</h6>
                  <p className="fs-4 fw-bold">5.2%</p>
                </div>
                <div className="mt-3">
                  <h6 className="text-secondary">Housing Stress</h6>
                  <p className="fs-4 fw-bold">High</p>
                </div>
                <div className="mt-3">
                  <h6 className="text-secondary">Infrastructure Strain</h6>
                  <p className="fs-4 fw-bold">Severe</p>
                </div>
              </Card.Body>
            </Card>

            <Card bg="dark" text="light" className="border-secondary">
              <Card.Body>
                <Card.Title className="text-success fw-bold">Summary</Card.Title>
                <Card.Text className="text-secondary">
                  This report provides a detailed analysis of housing,
                  population, and infrastructure data for Victoria. The findings
                  indicate significant population growth leading to increased
                  housing stress and severe strain on existing infrastructure.
                  Projections suggest these trends will continue without
                  intervention.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Full Analysis + Charts */}
          <Col lg={8}>
            {/* Full Text Analysis */}
            <Card bg="dark" text="light" className="border-secondary mb-4">
              <Card.Body>
                <Card.Title className="text-success fw-bold">
                  Full Text Analysis
                </Card.Title>
                <Card.Text className="text-secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  non risus. Suspendisse lectus tortor, dignissim sit amet,
                  adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                  diam. Maecenas ligula massa, varius a, semper congue, euismod
                  non, mi. Proin porttitor, orci nec nonummy molestie, enim est
                  eleifend mi, non fermentum diam nisl sit amet erat.
                  <br />
                  <br />
                  Fusce pellentesque suscipit nibh. Integer vitae libero ac
                  risus egestas placerat. Vestibulum commodo felis quis tortor.
                  Ut aliquam sollicitudin leo. Cras iaculis ultricies nulla.
                  Donec quis dui at dolor tempor interdum.
                </Card.Text>
              </Card.Body>
            </Card>

            {/* Chart Placeholder */}
            <Card bg="dark" text="light" className="border-secondary mb-4">
              <Card.Body className="text-center">
                <Card.Title className="text-success fw-bold">
                  Population Growth Chart
                </Card.Title>
                <div className="border border-secondary rounded d-flex align-items-center justify-content-center text-secondary mt-3" style={{ height: "250px" }}>
                  [Chart Placeholder]
                </div>
              </Card.Body>
            </Card>

            {/* Table Placeholder */}
            <Card bg="dark" text="light" className="border-secondary mb-4">
              <Card.Body className="text-center">
                <Card.Title className="text-success fw-bold">
                  Housing Data Table
                </Card.Title>
                <div className="border border-secondary rounded d-flex align-items-center justify-content-center text-secondary mt-3" style={{ height: "250px" }}>
                  [Table Placeholder]
                </div>
              </Card.Body>
            </Card>

            {/* Map Placeholder */}
            <Card bg="dark" text="light" className="border-secondary">
              <Card.Body className="text-center">
                <Card.Title className="text-success fw-bold">
                  Infrastructure Strain Map
                </Card.Title>
                <div className="border border-secondary rounded d-flex align-items-center justify-content-center text-secondary mt-3" style={{ height: "250px" }}>
                  [Map Placeholder]
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReportPage;
