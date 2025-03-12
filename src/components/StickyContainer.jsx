import React, { useState } from "react";
import StickyNote from "./StickyNote";

function StickyContainer() {
  const [zIndex, setZindex] = useState(1);
  const [initialPosition, setInitialPosition] = useState({ x: 80, y: 130 });

  const colors = ["first-color", "second-color", "third-color", "fourth-color"];

  return colors.map((color) => (
    <StickyNote
      colorClass={color}
      initialPosition={{ x: initialPosition.x, y: initialPosition.y }}
    ></StickyNote>
  ));
}

export default StickyContainer;
