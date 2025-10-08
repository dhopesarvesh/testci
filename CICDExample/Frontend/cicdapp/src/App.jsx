import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://localhost:5001/api/message") // later, change this to deployed backend URL
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Error fetching backend"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Frontend + Backend CI/CD Demo 🚀</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
