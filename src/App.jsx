import { useState } from "react";
import "./App.css";
import StickyContainer from "./components/StickyContainer";
import Menu from "./components/Menu";

function App() {
  const [stickies, setStickies] = useState([]);
  const [id, setId] = useState(0);

  const addSticky = (color) => {
    setStickies([...stickies, { color, id }]);
    setId(id + 1);
  };

  return (
    <>
      <Menu addSticky={addSticky} />
      <StickyContainer stickies={stickies} />
    </>
  );
}

export default App;
