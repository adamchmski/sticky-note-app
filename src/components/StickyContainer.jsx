import { useState, useEffect } from "react";
import StickyNote from "./StickyNote";

function StickyContainer({ stickies, onDelete }) {
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [initialPosition, setInitialPosition] = useState({ x: 80, y: 130 });

  return stickies.map(({ color, id }) => (
    <StickyNote
      key={id}
      id={id}
      colorClass={color}
      initialPosition={{ x: initialPosition.x, y: initialPosition.y }}
      onDelete={onDelete}
      maxZIndex={maxZIndex}
      setMaxZIndex={setMaxZIndex}
    ></StickyNote>
  ));
}

export default StickyContainer;
