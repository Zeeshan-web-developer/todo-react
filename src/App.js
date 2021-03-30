import "./App.css";
import db from "./firebase";

import React, { useState, useEffect } from "react";
function App() {
  const [items, setItems] = useState(["zeeshan"]);
  const [input, setInput] = useState("");

  useEffect(() => {
    //it only loads first time
    db.collection("todos").onSnapshot((snapshot) => {
      setItems(snapshot.docs.map((doc) => doc.data().todo));
    });
  }, []);

  const add = () => {
    db.collection("todos").add({
      todo: input,
    });
    setInput("");
  };
  return (
    <>
      <input value={input} onChange={(event) => setInput(event.target.value)} />
      <button onClick={add}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}
export default App;
