import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { updateSticky } from "../services/stickyService";
import "./StickyNote.css";

function StickyNote({
  id,
  colorClass,
  initialPosition,
  initialSize,
  initialZIndex,
  initialText,
  onDelete,
  maxZIndex,
  setMaxZIndex,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState(initialPosition);
  const [cardSize, setCardSize] = useState(initialSize);
  const [zIndex, setZIndex] = useState(initialZIndex);
  const [text, setText] = useState(initialText);
  const cardRef = useRef(null);
  const saveTimeout = useRef(null);

  // Handles saving a card to server upon change
  const saveCard = async () => {
    console.log("CARD SAVED");
    try {
      await updateSticky({
        id,
        color: colorClass,
        position: cardPosition,
        size: cardSize,
        zIndex,
        text,
      });
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  // Debounced save function
  const debouncedSave = () => {
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      saveCard();
    }, 300);
  };

  // Handles move to front functionality
  const moveToFront = () => {
    setZIndex(maxZIndex);
    setMaxZIndex(maxZIndex + 1);
    debouncedSave();
  };

  // Handles dragging functionality
  const handleMouseDown = (e) => {
    setStartPosition({ x: e.clientX, y: e.clientY });
    setDragging(true);
    document.body.style.userSelect = "none"; // Disable text highlight when dragging
  };

  useEffect(() => {
    if (!dragging) {
      debouncedSave();
      return;
    }

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
      setDragging(false);
      document.body.style.userSelect = ""; // Enable text highlight when done dragging
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
      setDragging(false);
    };
  }, [dragging]);

  // Handles resize tracking
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setCardSize({ width, height });
      }
    });

    observer.observe(card);

    return () => {
      observer.disconnect();
    }; // Cleanup on unmount
  }, []);

  // Handles resize saving
  useEffect(() => {
    debouncedSave();
  }, [cardSize]);

  const handleTextAreaChange = (e) => {
    setText(e.target.value);
    debouncedSave();
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, []);

  return (
    <div
      className={`my-card ${colorClass}`}
      style={{
        left: `${cardPosition.x}px`,
        top: `${cardPosition.y}px`,
        height: `${cardSize.height}px`,
        width: `${cardSize.width}px`,
        zIndex: zIndex,
      }}
      ref={cardRef}
      onMouseDown={moveToFront}
    >
      <div
        className={`sticky-header ${colorClass}`}
        onMouseDown={handleMouseDown}
      >
        <FontAwesomeIcon
          className="delete-btn"
          icon={faCircleXmark}
          onClick={() => onDelete(id)}
        />
      </div>
      <textarea
        className={`${colorClass}`}
        type="text"
        readOnly={!isEditable}
        placeholder="Double click to type..."
        onDoubleClick={() => setIsEditable(true)}
        onBlur={() => setIsEditable(false)}
        onChange={handleTextAreaChange}
        defaultValue={initialText}
      ></textarea>
    </div>
  );
}

export default StickyNote;
