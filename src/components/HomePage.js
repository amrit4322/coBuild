import React from "react";
import { Navbar, Nav, Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ fontFamily: "Spline Sans, sans-serif", backgroundColor: "#ffffff", color: "#1a1a1a" }}>
      {/* NAVBAR */}
      <Navbar expand="lg" bg="light" variant="light" className="border-bottom py-3">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4 d-flex align-items-center gap-2">
            <svg width="32" height="32" fill="#38e07b" viewBox="0 0 48 48">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
              />
            </svg>
            Planwise
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="mx-auto">
              <Nav.Link href="/">About</Nav.Link>
              <Nav.Link as={Link} to="/map">Map</Nav.Link>
              <Nav.Link as={Link}  to="/dashboard" >Dashboard</Nav.Link>
              <Nav.Link as={Link}  to="/analytics" >Analyis</Nav.Link>
            </Nav>
            <Button variant="success" className="rounded-pill fw-bold px-4">Get Started</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* HERO */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          minHeight: "70vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwxkRJuGMeYWaFn56XgKolnt7OinNVIPipDGenTIuNamljkf4isM8cCWQt9_DIz1X7DCVFZnYjW_IhzJfhvl8rOJhHy2_Ev5UCxdEVQJ0wBO4YhENuAOCgRXG7JJSubD_NbA9MHRiZGdhoBSp92-FcsLVz1y-EsmRJS_JqjQrV2cXqORVhdh5WDHPffyihDzLAypKbXd_2mrFWAU-92T1bEMxmu1FJasd6RwyFCcbj-VBi3vLPe8H6lRRUI06_sBCmr0_ZR2Q_-RQ')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <h1 className="display-4 fw-bold mb-3">Plan Victoria’s Future with Data</h1>
          <p className="fs-5 mx-auto" style={{ maxWidth: "700px" }}>
            Planwise empowers communities with comprehensive housing, infrastructure, and planning data for informed decision-making and sustainable growth.
          </p>
          <Button variant="success" size="lg" className="rounded-pill fw-bold px-5 mt-4">
            Explore Data
          </Button>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Empowering Communities with Data</h2>
            <p className="text-muted fs-5 mt-3">
              Planwise provides access to housing, infrastructure, and planning data to help communities shape their future.
            </p>
          </div>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm border-0 text-center p-4">
                <div className="rounded-circle bg-success bg-opacity-10 mx-auto d-flex justify-content-center align-items-center mb-4" style={{ width: "60px", height: "60px" }}>
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 256 256" className="text-success">
                    <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77Z"></path>
                  </svg>
                </div>
                <Card.Title className="fw-bold">Housing Insights</Card.Title>
                <Card.Text className="text-muted">
                  Gain insights into housing trends, affordability, and availability across Victoria.
                </Card.Text>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0 text-center p-4">
                <div className="rounded-circle bg-success bg-opacity-10 mx-auto d-flex justify-content-center align-items-center mb-4" style={{ width: "60px", height: "60px" }}>
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 256 256" className="text-success">
                    <path d="M235.92,199A8,8,0,0,1,225,195.92L155.32,72H136v8a8,8,0,0,1-16,0V72H100.68L31,195.92A8,8,0,0,1,17,188.08L82.32,72H24a8,8,0,0,1,0-16H232a8,8,0,0,1,0,16H173.68L239,188.08A8,8,0,0,1,235.92,199Z"></path>
                  </svg>
                </div>
                <Card.Title className="fw-bold">Infrastructure Planning</Card.Title>
                <Card.Text className="text-muted">
                  Visualize and analyze infrastructure data to optimize planning and development.
                </Card.Text>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow-sm border-0 text-center p-4">
                <div className="rounded-circle bg-success bg-opacity-10 mx-auto d-flex justify-content-center align-items-center mb-4" style={{ width: "60px", height: "60px" }}>
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 256 256" className="text-success">
                    <path d="M228.92,49.69a8,8,0,0,0-6.86-1.45L160.93,63.52,99.58,32.84a8,8,0,0,0-5.52-.6l-64,16A8,8,0,0,0,24,56V200a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8.15,8.15,0,0,0,160,224l64-16A8,8,0,0,0,232,200V56A8,8,0,0,0,228.92,49.69Z"></path>
                  </svg>
                </div>
                <Card.Title className="fw-bold">Community Development</Card.Title>
                <Card.Text className="text-muted">
                  Support local community initiatives and promote sustainable growth.
                </Card.Text>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="bg-light border-top py-5">
        <Container className="text-center">
          <h5 className="fw-bold mb-3">Planwise</h5>
          <Nav className="justify-content-center gap-4 mb-3">
            <Nav.Link href="/" className="text-muted">Overview</Nav.Link>
            <Nav.Link href="/" className="text-muted">Data</Nav.Link>
            <Nav.Link href="/" className="text-muted">Insights</Nav.Link>
            <Nav.Link href="/" className="text-muted">Community</Nav.Link>
            <Nav.Link href="/" className="text-muted">Contact</Nav.Link>
          </Nav>
          <p className="text-muted mb-0">© 2024 Planwise. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}
