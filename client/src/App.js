import React, { useState, useEffect } from "react";
import "./App.css";
import "fontsource-roboto";
import Title from "./components/Title"
import Search from "./components/Search"
import Beetles from "./components/Beetles"
import JohnnyCash from "./components/JohnnyCash";

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
      <Title />
        {/* <p className="App-intro">{apiResponse} « Api Response is here!</p> */}
      <Search />
      <Beetles />
      <JohnnyCash />
    </div>
  );
}

export default App;
