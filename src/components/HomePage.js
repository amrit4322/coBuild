import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaBuilding, FaChartLine, FaMapMarkedAlt, FaUsers, FaArrowRight, FaGlobe, FaRocket, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="cobuild-app">
      {/* NAVBAR */}
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
              
            
              <Nav.Link as={Link} to="/dashboard" className="nav-link-enhanced">Dashboard</Nav.Link>
          
            </Nav>
           
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* HERO SECTION */}
      <section className="hero-enhanced">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="floating-elements">
            <div className="floating-circle circle-1"></div>
            <div className="floating-circle circle-2"></div>
            <div className="floating-circle circle-3"></div>
            <div className="floating-circle circle-4"></div>
            <div className="floating-circle circle-5"></div>
          </div>
        </div>
        <Container>
          <Row className="align-items-center hero-content">
            <Col lg={6} className="hero-text-section">
              <div className={`hero-content-wrapper ${isVisible ? 'fade-in' : ''}`}>
                <Badge bg="primary" className="hero-badge-enhanced">
                  <FaRocket className="badge-icon" />
                  <span>GovHack 2025 Project</span>
                </Badge>
                <h1 className="hero-title-enhanced">
                  CoBuild
                  <span className="title-highlight"> Smart Cities</span>
                </h1>
                <p className="hero-subtitle-enhanced">
                  A revolutionary data-driven urban planning platform that empowers communities 
                  to make informed decisions about city development and infrastructure.
                </p>
                <div className="hero-buttons-enhanced">
                  <Button variant="primary" size="lg" className="btn-primary-enhanced" onClick={() => navigate("/dashboard")}>
                    Explore Platform
                    <FaArrowRight className="btn-icon" />
                  </Button>
                  <Button variant="outline-light" size="lg" className="btn-secondary-enhanced" onClick={() => navigate("/dashboard")}>
                    <FaGlobe className="btn-icon" />
                    View Demo
                  </Button>
                </div>
                <div className="hero-stats-enhanced">
                  <div className="stat-item-enhanced">
                    <div className="stat-number">15+</div>
                    <div className="stat-label">Cities</div>
                  </div>
                  <div className="stat-item-enhanced">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Data Points</div>
                  </div>
                  <div className="stat-item-enhanced">
                    <div className="stat-number">89%</div>
                    <div className="stat-label">Accuracy</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="hero-visual-section">
              <div className={`dashboard-showcase ${isVisible ? 'slide-in' : ''}`}>
                <div className="showcase-header">
                  <div className="showcase-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="showcase-title">CoBuild Dashboard</div>
                </div>
                <div className="showcase-content">
                  <div className="chart-showcase">
                    <div className="chart-container">
                      <div className="chart-bars">
                        <div className="bar bar-1"></div>
                        <div className="bar bar-2"></div>
                        <div className="bar bar-3"></div>
                        <div className="bar bar-4"></div>
                        <div className="bar bar-5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <div className="metric-icon">
                        <FaUsers />
                      </div>
                      <div className="metric-content">
                        <div className="metric-number">2.5M</div>
                        <div className="metric-label">Population</div>
                      </div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-icon">
                        <FaChartLine />
                      </div>
                      <div className="metric-content">
                        <div className="metric-number">89%</div>
                        <div className="metric-label">Growth</div>
                      </div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-icon">
                        <FaBuilding />
                      </div>
                      <div className="metric-content">
                        <div className="metric-number">150</div>
                        <div className="metric-label">Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

   

      {/* STATS SECTION */}
      <section className="stats-enhanced">
        <Container>
          <Row className="stats-grid-enhanced">
            <Col md={3} className="stat-col">
              <div className="stat-card-enhanced">
                <div className="stat-icon-wrapper">
                  <FaGlobe className="stat-icon" />
                </div>
                <div className="stat-content">
                  <div className="stat-number-enhanced">15+</div>
                  <div className="stat-label-enhanced">Cities Analyzed</div>
                </div>
              </div>
            </Col>
            <Col md={3} className="stat-col">
              <div className="stat-card-enhanced">
                <div className="stat-icon-wrapper">
                  <FaChartLine className="stat-icon" />
                </div>
                <div className="stat-content">
                  <div className="stat-number-enhanced">500+</div>
                  <div className="stat-label-enhanced">Data Sources</div>
                </div>
              </div>
            </Col>
            <Col md={3} className="stat-col">
              <div className="stat-card-enhanced">
                <div className="stat-icon-wrapper">
                  <FaShieldAlt className="stat-icon" />
                </div>
                <div className="stat-content">
                  <div className="stat-number-enhanced">89%</div>
                  <div className="stat-label-enhanced">Accuracy Rate</div>
                </div>
              </div>
            </Col>
            <Col md={3} className="stat-col">
              <div className="stat-card-enhanced">
                <div className="stat-icon-wrapper">
                  <FaRocket className="stat-icon" />
                </div>
                <div className="stat-content">
                  <div className="stat-number-enhanced">24/7</div>
                  <div className="stat-label-enhanced">Real-time Data</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA SECTION */}
      <section className="cta-enhanced">
        <Container>
          <div className="cta-content-enhanced">
            <Badge bg="primary" className="cta-badge">
              <FaRocket className="badge-icon" />
              <span>Ready to Transform Cities?</span>
            </Badge>
            <h2 className="cta-title-enhanced">Start Building Smarter Cities Today</h2>
            <p className="cta-subtitle-enhanced">
              Join us in creating sustainable, data-driven urban environments for future generations.
            </p>
            
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="footer-enhanced">
        <Container>
          <Row className="footer-content">
            <Col lg={4} className="footer-brand">
              <div className="footer-logo">
                <div className="footer-icon-wrapper">
                  <FaBuilding />
                </div>
                <span>CoBuild</span>
              </div>
              <p className="footer-description">
                Empowering communities with data-driven insights for sustainable urban development.
              </p>
            </Col>
           
         
          </Row>
          <div className="footer-bottom">
            <p>&copy; 2025 CoBuild - GovHack 2025 Project. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
