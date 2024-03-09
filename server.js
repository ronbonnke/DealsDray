const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

let users = [
  {
    id: 1,
    username: "user1",
    password: "$2a$10$WbBrJ0nDWACFw06jF7PylOKMg4NnYujyPOZaEIs1fwHGYtmM72WcG",
  },
];

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  res.redirect("/table"); // Redirect to the table page
});

app.get("/table", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "table.html"));
});

app.listen(5000, () => console.log("Server started on port 5000"));
