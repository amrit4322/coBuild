import React, { useState, useMemo } from "react";
import { Card, Row, Col, Button, Badge, Stack } from "react-bootstrap";
import FeedbackModal from "./FeedbackModel";
import FeedbackWordCloud from "./FeedbackWordCloud";

export default function SentimentAnalysis() {
  const [showModal, setShowModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([
    { rating: 5, text: "Loved it" },
    { rating: 2, text: "Sad about the things" },
    { rating: 5, text: "Public transport has improved this year" },
    { rating: 3, text: "We need more green spaces in the community" },
    { rating: 4, text: "Schools need better teachers and resources" },
    { rating: 2, text: "Healthcare facilities are poor" },
    { rating: 3, text: "Road infrastructure is lacking" },
  ]);

  const avgScore =
    (feedbacks.reduce((sum, f) => sum + f.rating, 0) / (feedbacks.length * 5)) *
    100;

  const addFeedback = (newFeedback) => {
    setFeedbacks([newFeedback, ...feedbacks]); // New feedback on top
  };

  const getBadgeColor = (rating) => {
    if (rating <= 2) return "danger";
    if (rating === 3) return "warning";
    return "success";
  };

  // Build Word Cloud Data
  const words = useMemo(() => {
    const text = feedbacks.map((f) => f.text).join(" ");
    const wordArray = text.split(/\s+/).map((word) => word.toLowerCase());
    const ignore = ["the", "and", "to", "we", "it", "are", "is", "in", "of"];
    const freqMap = {};

    wordArray.forEach((word) => {
      if (!ignore.includes(word)) {
        freqMap[word] = (freqMap[word] || 0) + 1;
      }
    });

    return Object.keys(freqMap).map((key) => ({
      text: key,
      value: freqMap[key],
    }));
  }, [feedbacks]);

  const wordCloudOptions = {
    rotations: 2,
    rotationAngles: [-45, 0],
    fontSizes: [16, 50],
    fontFamily: "sans-serif",
    colors: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6610f2"],
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title>👥 Community Sentiment Analysis</Card.Title>
        <Row className="mt-3">
          {/* Score */}
          <Col md={3} className="text-center">
            <Card className="p-3">
              <h5>Satisfaction Score</h5>
              <h1 className="fw-bold text-primary">{avgScore.toFixed(0)}%</h1>
              <small>{feedbacks.length} responses</small>
            </Card>
          </Col>

          {/* Feedback Scrollable */}
          <Col >
            <Card className="p-3" >
              <h5>Recent Feedback</h5>
              <Row className="mt-3">
              <Col md={6}>
                <Stack style={{ maxHeight: "225px", overflowY: "auto" }} gap={2} className="mt-3">
                  {feedbacks.slice(0, 5).map((f, i) => (
                    <Stack
                      key={i}
                      direction="horizontal"
                      gap={3}
                      className="align-items-center border rounded px-3 py-2 shadow-sm"
                    >
                      <Badge bg={getBadgeColor(f.rating)} pill style={{ fontSize: "1.2rem" }}>
                        {["😡", "😕", "😐", "🙂", "😍"][f.rating - 1]}
                      </Badge>
                      <span>{f.text}</span>
                    </Stack>
                  ))}
                </Stack>
              </Col>
              {/* Right Column: Word Cloud fills rest of space */}
              <Col md={6} className="d-flex justify-content-center align-items-center">
                <div style={{ width: "100%", height: "225px" }}>
                  <FeedbackWordCloud words={words} />
                </div>
              </Col>
              </Row>
            </Card>
            <div className="mt-3 d-flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setShowModal(true)}>
                Submit New Feedback
              </Button>
            </div>
          </Col>




        </Row>
      </Card.Body>
      <FeedbackModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        addFeedback={addFeedback}
      />
    </Card>
  );
}
