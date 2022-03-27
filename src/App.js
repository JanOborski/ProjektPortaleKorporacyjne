import "./App.css";
import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import { clock } from "./scripts/timer";

function App() {
  const [taskList, setList] = useState([
    { id: "1", title: "title", desc: "desc", value: "toexeccute" },
    { id: "2", title: "title", desc: "desc", value: "toexeccute" },
    { id: "3", title: "title", desc: "desc", value: "toexeccute" },
  ]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [timer, setTime] = useState([]);
  const [show, setShow] = useState(false);
  const taskTitle = "taskTitle";
  const taskDescription = "taskDescription";

  const currentTime = () => {
    const time = clock();
    setTime([time]);
  };

  useEffect(() => {
    setInterval(() => currentTime(), 1000);
  }, []);

  const handleOnChange = (e) => {
    const inputType = e.target.id;
    if (inputType === taskTitle) {
      const userInput = e.target.value;
      setTitle(userInput);
    } else if (inputType === taskDescription) {
      const userInput = e.target.value;
      setDesc(userInput);
    } else return;
  };

  const handleAddTask = () => {
    if (title !== "" && title.length < 14 && desc !== "") {
      const inputValues = {
        id: taskList.length + 1,
        title: title,
        desc: desc,
        value: "toexeccute",
      };
      setList((prevState) => [...prevState, inputValues]);
      setTitle("");
      setDesc("");
      setShow(false);
      document.body.classList.remove("popupOpened");
    } else if (title === "") {
      alert("Pole tytuł zadania jest wymagane");
    } else if (desc === "") {
      alert("Pole opis zadania jest wymagane");
    } else if (title.length > 14) {
      alert("Pole tytułu zadania jest za może zawierać maksymalnie 14 znaków");
    } else return;
  };

  const handleStatusChange = (e, id) => {
    const taskValue = e.target.value;
    const tasksCopy = [...taskList];
    const index = tasksCopy.findIndex((list) => list.id === id);
    tasksCopy[index].value = taskValue;
    setList(tasksCopy);
  };

  const handleTaskPopupOpen = () => {
    setShow(true);
    document.body.classList.add("popupOpened");
  };

  const handleTaskPopupClose = () => {
    setShow(false);
    document.body.classList.remove("popupOpened");
  };

  return (
    <div className="App">
      <Header timeHeader={timer} popupClick={() => handleTaskPopupOpen()} />
      <div
        className="containerInputs"
        style={{
          display: show ? "inline-flex" : "none",
          opacity: show ? "1" : "0",
        }}
      >
        <div className="innerContainerInputs">
          <div className="tables">
            <label htmlFor={taskTitle}>TYTUŁ ZADANIA</label>
            <input
              id={taskTitle}
              type="text"
              value={title}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="tables">
            <label htmlFor={taskDescription}>OPIS ZADANIA</label>
            <textarea
              id={taskDescription}
              type="text"
              value={desc}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <button onClick={() => handleAddTask()}>DODAJ ZADANIE</button>
          <button
            className="buttonClosePopup"
            onClick={() => handleTaskPopupClose()}
          >
            X
          </button>
        </div>
      </div>
      <TaskList
        changeTaskStatus={(e, id) => handleStatusChange(e, id)}
        tasks={taskList}
      />
    </div>
  );
}

export default App;
