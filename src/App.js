import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/profile", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  const handleLogout = () => {
    axios.get("/api/logout", { withCredentials: true }).then(() => {
      setUser(null);
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!user ? (
        <div>
          <h1>Welcome to Google OAuth App</h1>
          <button onClick={handleLogin} style={buttonStyle}>
            Sign in with Google
          </button>
        </div>
      ) : (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          {user.photos && user.photos.length > 0 && (
            <img src={user.photos[0].value} alt="Profile" />
          )}
          {user.emails && user.emails.length > 0 && (
            <p>Email: {user.emails[0].value}</p>
          )}
          <button onClick={handleLogout} style={buttonStyle}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  background: "#4285F4",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default App;
