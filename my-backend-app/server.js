const express = require("express");
const app = express();

// Define a port number
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/api/login", (req, res) => {
  // Example authentication logic
  const { username, password } = req.body;
  // Check if username and password are valid
  if (username === "admin" && password === "password") {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});
