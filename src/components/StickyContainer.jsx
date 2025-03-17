import { useState, useEffect } from "react";
import StickyNote from "./StickyNote";

function StickyContainer({ stickies, onDelete }) {
  const [maxZIndex, setMaxZIndex] = useState(1);

  // Sets maxZIndex when stickies first load
  useEffect(() => {
    if (stickies.length === 0) {
      setMaxZIndex(1);
      return;
    }

    const currentMax = Math.max(...stickies.map((sticky) => sticky.zIndex));
    if (currentMax > maxZIndex) {
      setMaxZIndex(currentMax);
    }
  }, [stickies]);

  return stickies.map(({ color, id, position, size, zIndex, text }) => (
    <StickyNote
      key={id}
      id={id}
      colorClass={color}
      initialPosition={{ x: position.x, y: position.y }}
      initialSize={size}
      initialZIndex={zIndex}
      initialText={text}
      onDelete={onDelete}
      maxZIndex={maxZIndex}
      setMaxZIndex={setMaxZIndex}
    ></StickyNote>
  ));
}

export default StickyContainer;
