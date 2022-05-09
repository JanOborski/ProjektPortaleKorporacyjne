import "./App.css";
import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import { clock } from "./scripts/timer";
import { getDatabase, ref, onValue, update, push } from "firebase/database";
import { app } from "./resources/Firebase";
import UserAdd from "./components/UserAdd";

function App() {
  const [taskList, setList] = useState(() => {
    if (localStorage.getItem("tasks")) {
      return JSON.parse(localStorage.getItem("tasks")).taskList;
    } else return [];
  });

  const db = getDatabase(app);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [timer, setTime] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("");
  var array = null;
  const [newTaskCategoryArray, setNewTaskCategoryArray] = useState(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      array = data;
      console.log(array);
    });
    if (array.TaskCategory !== undefined) {
      return array.TaskCategory;
    } else return [];
  });

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      const key = "-N1dBs0tl5D4npgLW6wE";
      setUser(data[key].values.userType);
      // setNewTaskCategoryArray(data.TaskCategory);
    });
  }, [db]);

  useEffect(() => {
    update(ref(db), {
      TaskCategory: newTaskCategoryArray,
    });
  }, [newTaskCategoryArray]);

  const newTaskTypeClick = () => {
    setNewTaskCategoryArray((prevState) => [...prevState, newTaskCategory]);
    // update(ref(db), {
    //   TaskType: { [newTaskCategory]: newTaskCategory },
    // });
  };

  useEffect(() => {
    update(ref(db), {
      TaskCategory: newTaskCategoryArray,
    });
  }, [db]);

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
    const inputID = e.target.id;
    console.log(inputID);
    const userInput = e.target.value;
    if (inputID === taskTitle) {
      setTitle(userInput);
    } else if (inputID === taskDescription) {
      setDesc(userInput);
    } else if (inputID === "taskType") {
      setNewTaskCategory(userInput);
    } else return [];
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify({ taskList }));
  }, [taskList]);

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
      alert(
        "Pole tytułu zadania jest za długie może zawierać maksymalnie 14 znaków"
      );
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
      <Header
        timeHeader={timer}
        user={user}
        newTaskCategory={newTaskCategory}
        newTaskTypeClick={() => newTaskTypeClick()}
        taskOnChange={(e) => handleOnChange(e)}
        popupClick={() => handleTaskPopupOpen()}
      />
      {user === "admin" ? <UserAdd /> : null}
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
        handleOnChange={(e) => handleOnChange(e)}
        changeTaskStatus={(e, id) => handleStatusChange(e, id)}
        tasks={taskList}
        newTaskCategoryArray={newTaskCategoryArray}
      />
    </div>
  );
}

export default App;
