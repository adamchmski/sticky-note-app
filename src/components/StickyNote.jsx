import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

function StickyNote({ colorClass }) {
  // have location style be dynamic
  // move to front event listener
  // delete event listener
  // text area event listener

  const [isEditable, setIsEditable] = useState(false);

  return (
    <div
      className={`my-card ${colorClass}`}
      style={{ left: "80px", top: "130px" }}
    >
      <div className={`sticky-header ${colorClass}`}>
        <FontAwesomeIcon className="delete-btn" icon={faCircleXmark} />
      </div>
      <textarea
        className={`${colorClass}`}
        type="text"
        readOnly={!isEditable}
        onDoubleClick={() => setIsEditable(true)}
        onBlur={() => setIsEditable(false)}
      ></textarea>
    </div>
  );
}

export default StickyNote;
