import React from "react";

export default function TestComponent() {
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "red",
        color: "white",
        padding: "10px",
        zIndex: 1000,
      }}
    >
      React is working!
    </div>
  );
}
