import React, { useState } from "react";
import { Navbar, Container, Button, Row, Col, ListGroup, Card, Form } from "react-bootstrap";

const DashboardPage = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const TabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="d-flex align-items-center justify-content-center bg-light border" style={{ height: "500px" }}>
            [Victoria Infrastructure Overview Map]
          </div>
        );
      case "forecast":
        return (
          <div className="p-3">
            <h4>Forecast View</h4>
            <div className="my-3">
              <Form.Range min="2023" max="2030" defaultValue="2025" />
            </div>
            <Row>
              <Col md={6}><div className="border bg-white text-center p-3">[Housing Chart]</div></Col>
              <Col md={6}><div className="border bg-white text-center p-3">[Student Capacity Chart]</div></Col>
            </Row>
          </div>
        );
      default:
        return (
          <div className="d-flex align-items-center justify-content-center bg-light border" style={{ height: "500px" }}>
            [{activeTab} data view placeholder]
          </div>
        );
    }
  };

  return (
    <div className="bg-light">
      {/* Header */}
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand className="fw-bold">CoBuild Dashboard</Navbar.Brand>
          <Button variant="outline-dark" onClick={() => setPage("landing")}>← Back to Home</Button>
        </Container>
      </Navbar>

      {/* Filters */}
      <div className="p-3 border-bottom bg-white">
        <Form.Select className="me-2 d-inline-block w-auto">
          <option>Select Suburb / Postcode</option>
          <option>Melbourne CBD (3000)</option>
        </Form.Select>
        <Form.Select className="d-inline-block w-auto">
          <option>All Regions</option>
          <option>Greater Melbourne</option>
        </Form.Select>
      </div>

      <Container fluid>
        <Row>
          {/* Sidebar Navigation */}
          <Col md={2} className="border-end bg-white p-0">
            <ListGroup variant="flush">
              {["overview", "housing", "schools", "transport", "community", "forecast", "sentiment"].map(tab => (
                <ListGroup.Item
                  key={tab}
                  action
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* Main Content */}
          <Col md={7} className="p-3">
            <TabContent />
          </Col>

          {/* Right Panel */}
          <Col md={3} className="border-start bg-white p-3">
            <h5>Summary Metrics</h5>
            {["Housing Capacity", "School Capacity", "Transport", "Community Services"].map((metric, i) => (
              <Card className="mb-3" key={i}>
                <Card.Body>
                  <Card.Title className="fs-6">{metric}</Card.Title>
                  <div className="bg-secondary rounded" style={{ height: "20px", width: "100%" }}>
                    <div className="bg-success rounded" style={{ width: `${80 - i * 20}%`, height: "100%" }}></div>
                  </div>
                  <p className="mt-2 mb-0">Status: OK</p>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;
