const { v4: uuidv4 } = require("uuid");

DUMMY_USERS = [
  {
    id: "u1",
    name: "Adam Chmielewski",
    email: "test@test.com",
    password: "testers",
  },
];

exports.getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

exports.signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (identifiedUser) {
    res
      .status(422)
      .json({ error: "There's already an account associated with this email" });
    return;
  }

  const newUser = {
    id: uuidv4(),
    name: name,
    email: email,
    password: password,
  };

  DUMMY_USERS.push(newUser);

  res.status(201).json({ newUser });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    res.status(401).json({ error: "user not found" });
    return;
  }

  res.json({ message: "Logged in!" });
};
