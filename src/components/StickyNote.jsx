import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import "./StickyNote.css";

function StickyNote({ colorClass, initialPosition }) {
  // move to front event listener
  // delete event listener

  const [isEditable, setIsEditable] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState(initialPosition);
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    setStartPosition({ x: e.clientX, y: e.clientY });
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;

    let distanceFromTop = startPosition.y - cardRef.current.offsetTop;
    let distanceFromLeft = startPosition.x - cardRef.current.offsetLeft;

    const mouseMove = (e) => {
      setIsEditable(false);

      let newY =
        e.clientY - distanceFromTop <= 0 ? 0 : e.clientY - distanceFromTop;
      let newX =
        e.clientX - distanceFromLeft <= 0 ? 0 : e.clientX - distanceFromLeft;

      setCardPosition({ x: newX, y: newY });
    };

    const mouseUp = (e) => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
      setDragging(false);
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    // this.moveToFront();

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
      setDragging(false);
    };
  }, [dragging]);

  return (
    <div
      className={`my-card ${colorClass}`}
      style={{ left: `${cardPosition.x}px`, top: `${cardPosition.y}px` }}
      ref={cardRef}
    >
      <div
        className={`sticky-header ${colorClass}`}
        onMouseDown={handleMouseDown}
      >
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
