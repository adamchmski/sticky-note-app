import { useState, useEffect } from "react";
import StickyNote from "./StickyNote";

function StickyContainer({ stickies, onDelete }) {
  const [maxZIndex, setMaxZIndex] = useState(1);

  return stickies.map(({ color, id, position }) => (
    <StickyNote
      key={id}
      id={id}
      colorClass={color}
      initialPosition={{ x: position.x, y: position.y }}
      onDelete={onDelete}
      maxZIndex={maxZIndex}
      setMaxZIndex={setMaxZIndex}
    ></StickyNote>
  ));
}

export default StickyContainer;
