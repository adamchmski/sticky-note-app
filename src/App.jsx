import { useState, useEffect } from "react";
import "./App.css";
import StickyContainer from "./components/StickyContainer";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Switch from "./components/Switch";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function App() {
  const [stickies, setStickies] = useState([]);
  const { isDarkMode } = useTheme();

  const addSticky = async (color) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          color,
        }),
      });

      const json = await response.json();

      setStickies([...stickies, json.newSticky]);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      });

      setStickies(
        stickies.filter((sticky) => {
          return sticky.id !== id;
        })
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  // Loads saved stickies
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL);
      const json = await response.json();
      setStickies(json);
    };

    fetchData();
  }, []);

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
