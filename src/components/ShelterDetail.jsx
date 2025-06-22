import React from "react";

const ShelterDetail = ({ shelter, onClose }) => {
  if (!shelter) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          minWidth: 300,
          padding: 32,
          boxShadow: "0 4px 24px #0001",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            background: "none",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
        <h2>{shelter.SHTER_NM}</h2>
        <div style={{ margin: "16px 0" }}>
          <b>주소:</b>{" "}
          <span>{shelter.REFINE_ROADNM_ADDR || shelter.REFINE_LOTNO_ADDR}</span>
        </div>
      </div>
    </div>
  );
};

export default ShelterDetail;
