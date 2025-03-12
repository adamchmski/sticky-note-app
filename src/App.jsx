import { useState, useEffect } from "react";
import "./App.css";
import StickyContainer from "./components/StickyContainer";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Switch from "./components/Switch";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function App() {
  const [stickies, setStickies] = useState([]);
  const [id, setId] = useState(0);
  const { isDarkMode } = useTheme();

  const addSticky = (color) => {
    setStickies([...stickies, { color, id }]);
    setId(id + 1);
  };

  const onDelete = (id) => {
    setStickies(
      stickies.filter((sticky) => {
        return sticky.id !== id;
      })
    );
  };

  return (
    <div className={isDarkMode ? "app dark" : "app"}>
      <header>
        <Menu addSticky={addSticky} />
        <div className="top-right">
          <Switch />
          <Login />
        </div>
      </header>
      <StickyContainer stickies={stickies} onDelete={onDelete} />
    </div>
  );
}

export default App;
