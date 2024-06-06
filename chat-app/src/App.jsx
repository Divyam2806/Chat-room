import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  {
    console.log(isLoggedIn);
  }
  return (
    <Router>
      <div>
        {!isLoggedIn && <Navigation />}
        {/* Include the Navigation component */}
        <Routes>
          {/* Conditionally render routes based on isLoggedIn state */}
          {isLoggedIn ? (
            <>
              <Route path="/home" element={<Home />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/login"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
