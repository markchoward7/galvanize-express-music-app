import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "fontsource-roboto";

function App() {
  const [apiResponse, setapiResponse] = useState("");

  let callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => setapiResponse(res));
  };

    useEffect(() => {
      callAPI();
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">{apiResponse}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
