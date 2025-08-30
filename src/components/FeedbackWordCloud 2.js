import React, { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

export default function FeedbackWordCloud({ words }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !words.length) return;

    const list = words.map((w) => [w.text, w.value]);

    WordCloud(canvasRef.current, {
      list,
      gridSize: 10,
      weightFactor: 15,
      fontFamily: "Poppins, sans-serif",
      color: () =>
        ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6610f2"][
          Math.floor(Math.random() * 5)
        ],
      rotateRatio: 0.5,
      rotationSteps: 2,
      backgroundColor: "transparent",
    });
  }, [words]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={200}
      style={{ width: "100%", height: "200px" }}
    />
  );
}
