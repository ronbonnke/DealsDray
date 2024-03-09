// login.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful, handle accordingly
      console.log("Login successful");
    } else {
      // Login failed, handle accordingly
      console.error("Login failed:", data.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});
