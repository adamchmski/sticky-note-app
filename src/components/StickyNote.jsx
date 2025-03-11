import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

function StickyNote({ colorClass }) {
  // have location style by dynamic
  // move to front event listener

  return (
    <div
      className={`my-card ${colorClass}`}
      style={{ left: "80px", top: "130px" }}
    >
      <div className={`sticky-header ${colorClass}`}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
    </div>
  );
}

export default StickyNote;
