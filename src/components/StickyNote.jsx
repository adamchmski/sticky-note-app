import React from "react";

function StickyNote({ colorClass }) {
  // have location style by dynamic
  // move to front event listener

  return (
    <div
      className={`myCard ${colorClass}`}
      style={{ left: "80px", top: "130px" }}
    ></div>
  );
}

export default StickyNote;
