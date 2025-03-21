import { useState, useEffect } from "react";
import "./App.css";
import StickyContainer from "./components/StickyContainer";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Switch from "./components/Switch";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import {
  createSticky,
  deleteSticky,
  getAllStickies,
  getUserStickies,
} from "./services/stickyService";

function App() {
  const [stickies, setStickies] = useState([]);
  const { isDarkMode } = useTheme();
  const [creator, setCreator] = useState("67dcadb07fbbf999d11377e5");

  const addSticky = async (color) => {
    try {
      const response = await createSticky(color, creator);
      setStickies([...stickies, response.newSticky]);
    } catch (error) {
      console.error("Error creating sticky:", error);
    }
  };

  const onDelete = async (_id) => {
    try {
      await deleteSticky(_id);
      setStickies(stickies.filter((sticky) => sticky._id !== _id));
    } catch (error) {
      console.error("Error deleting sticky:", error);
    }
  };

  // Loads saved stickies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserStickies(creator);
        setStickies(data);
      } catch (error) {
        console.error("Error loading stickies:", error);
      }
    };

    fetchData();
  }, [creator]);

  return (
    <div className={isDarkMode ? "app dark" : "app"}>
      <header>
        <Menu addSticky={addSticky} />
        <div className="top-right">
          <Switch />
          <Login setCreator={setCreator} />
        </div>
      </header>
      <StickyContainer stickies={stickies} onDelete={onDelete} />
    </div>
  );
}

export default App;
