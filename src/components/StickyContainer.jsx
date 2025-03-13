import { useState, useEffect } from "react";
import StickyNote from "./StickyNote";

function StickyContainer({ stickies, onDelete }) {
  const [maxZIndex, setMaxZIndex] = useState(1);

  // Sets maxZIndex when stickies first load
  useEffect(() => {
    if (stickies.length === 0) {
      return;
    }

    const currentMax = Math.max(...stickies.map((sticky) => sticky.zIndex));
    if (currentMax > maxZIndex) {
      setMaxZIndex(currentMax);
    }
  }, [stickies]);

  return stickies.map(({ color, id, position, zIndex }) => (
    <StickyNote
      key={id}
      id={id}
      colorClass={color}
      initialPosition={{ x: position.x, y: position.y }}
      initialZIndex={zIndex}
      onDelete={onDelete}
      maxZIndex={maxZIndex}
      setMaxZIndex={setMaxZIndex}
    ></StickyNote>
  ));
}

export default StickyContainer;
