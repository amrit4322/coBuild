import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const emojiMap = ["😡", "😕", "😐", "🙂", "😍"];

export default function FeedbackModal({ show, handleClose, addFeedback }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!rating || !text) {
      MySwal.fire({
        icon: "warning",
        title: "Incomplete Feedback",
        text: "Please provide both a rating and feedback message!",
      });
      return;
    }

    addFeedback({ rating, text });
    setRating(0);
    setText("");
    handleClose();

    MySwal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your feedback has been submitted successfully!",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Give Your Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div className="mb-3">
          {emojiMap.map((emoji, index) => (
            <span
              key={index}
              style={{
                fontSize: "2rem",
                cursor: "pointer",
                margin: "5px",
                filter: rating === index + 1 ? "drop-shadow(0 0 5px #000)" : "none",
              }}
              onClick={() => setRating(index + 1)}
            >
              {emoji}
            </span>
          ))}
        </div>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Write your feedback..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
