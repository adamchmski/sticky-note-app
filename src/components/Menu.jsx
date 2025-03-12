import React from "react";
import "./Menu.css";

function Menu() {
  const handleClick = (e) => {
    console.log("CLICK");
    if (e.target.tagName === "A") {
      e.preventDefault();
      e.stopPropagation();
      // this.addStickyNote(e.target.id);
    }
  };
  return (
    <div className="container">
      <input type="checkbox" id="toggle" />
      <label className="button" htmlFor="toggle">
        <nav className="nav" onClick={handleClick}>
          <ul>
            <li>
              <a id="first-color"></a>
            </li>
            <li>
              <a id="second-color"></a>
            </li>
            <li>
              <a id="third-color"></a>
            </li>
            <li>
              <a id="fourth-color"></a>
            </li>
          </ul>
        </nav>
      </label>
    </div>
  );
}

export default Menu;
