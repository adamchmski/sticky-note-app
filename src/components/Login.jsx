import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import Input from "../components/Input";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const nameInputHandler = (e) => {
    setNameValue(e.target.value);
  };

  const emailInputHandler = (e) => {
    setEmailValue(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameValue);
    console.log(emailValue);
    console.log(passwordValue);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{ margin: "20px", fontSize: "1.1rem" }}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={nameInputHandler}
              value={nameValue}
            ></input>
            <br />
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={emailInputHandler}
              value={emailValue}
            ></input>
            <br />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={passwordInputHandler}
              value={passwordValue}
            ></input>
            <br />
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
