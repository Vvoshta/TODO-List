import React from "react";
import "./App.css";
import Header from "./components/Header/header";
import { Content, Item } from "./components/Content/content";

function App() {
  const item: Item = { id: 0, text: "", completed: false };

  return (
    <div className="App">
      <Header />
      <Content {...item} />
    </div>
  );
}

export default App;
