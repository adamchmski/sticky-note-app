import "./Menu.css";

function Menu({ addSticky }) {
  const handleClick = (e) => {
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
              <a id="first-color" onClick={() => addSticky("first-color")}></a>
            </li>
            <li>
              <a
                id="second-color"
                onClick={() => addSticky("second-color")}
              ></a>
            </li>
            <li>
              <a id="third-color" onClick={() => addSticky("third-color")}></a>
            </li>
            <li>
              <a
                id="fourth-color"
                onClick={() => addSticky("fourth-color")}
              ></a>
            </li>
          </ul>
        </nav>
      </label>
    </div>
  );
}

export default Menu;
