import React, { useState } from "react";
import { Card, Row, Col, ListGroup, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function CommunitySentiment() {
  // Example starting data
  const [responses, setResponses] = useState([
    "We need more green spaces in the community.",
    "Public transport has improved this year."
  ]);
  const [satisfaction, setSatisfaction] = useState(78); // %
  const [totalResponses, setTotalResponses] = useState(123);

  const [newFeedback, setNewFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmitFeedback = () => {
    if (newFeedback.trim()) {
      setResponses([newFeedback, ...responses]);
      setTotalResponses(totalResponses + 1);
      setNewFeedback("");
      setShowModal(false);

      // Update satisfaction dynamically (optional logic)
      setSatisfaction((prev) => Math.min(prev + Math.random() * 2 - 1, 100));

      // Show success message
      Swal.fire({
        title: "Good job!",
        text: "Thank you for your feedback!",
        icon: "success"
      });
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title>👥 Community Sentiment Analysis</Card.Title>
        <Row className="mt-3">
          {/* Satisfaction Score */}
          <Col md={3} className="text-center">
            <Card className="p-3">
              <h5>Satisfaction Score</h5>
              <h1 className="fw-bold text-primary">{satisfaction}%</h1>
              <small>{totalResponses} responses</small>
            </Card>
          </Col>

          {/* Feedback List */}
          <Col md={9}>
            <Card className="p-3">
              <h5>Recent Feedback</h5>
              <ListGroup className="mt-2">
                {responses.slice(0, 5).map((resp, i) => (
                  <ListGroup.Item key={i}>{resp}</ListGroup.Item>
                ))}
              </ListGroup>

              <div className="mt-3 d-flex gap-2">
                <Button size="sm" variant="primary">
                  View All Feedback
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setShowModal(true)}>
                  Submit New Feedback
                </Button>
              </div>
            </Card>
          </Col>
                 </Row>

        {/* Feedback Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Submit Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Your Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  placeholder="Enter your feedback here..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmitFeedback}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

       </Card.Body>
     </Card>
   );
 }
