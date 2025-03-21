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
  getUserStickies,
} from "./services/stickyService";

function App() {
  const [stickies, setStickies] = useState([]);
  const { isDarkMode } = useTheme();
  const [creatorID, setCreatorID] = useState("");

  const addSticky = async (color) => {
    try {
      const response = await createSticky(color, creatorID);
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
    if (creatorID === "") {
      return;
    }
    const fetchData = async () => {
      try {
        const data = await getUserStickies(creatorID);
        setStickies(data);
      } catch (error) {
        console.error("Error loading stickies:", error);
      }
    };

    fetchData();
  }, [creatorID]);

  return (
    <div className={isDarkMode ? "app dark" : "app"}>
      <header>
        <Menu addSticky={addSticky} />
        <div className="top-right">
          <Switch />
          <Login creatorID={creatorID} setCreatorID={setCreatorID} />
        </div>
      </header>
      <StickyContainer stickies={stickies} onDelete={onDelete} />
    </div>
  );
}

export default App;
