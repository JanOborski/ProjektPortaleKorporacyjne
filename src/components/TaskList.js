import React from "react";
import "./TaskList.css";

function TaskList(props) {
  const filterTasks = (value) => {
    const filteredData = props.tasks
      .filter((task) => task.value === value)
      .map((task) => (
        <div className="taskCard" key={task.id}>
          <h1>{task.title}</h1>
          <p>{task.desc}</p>
          <select
            className="custom-select"
            value={task.value}
            onChange={(e) => props.changeTaskStatus(e, task.id)}
          >
            <option value="toexeccute">🔴</option>
            <option value="inproggress">🟠</option>
            <option value="done">🟢</option>
          </select>
        </div>
      ));
    if (value === "toexeccute") {
      return filteredData;
    } else if (value === "inproggress") {
      return filteredData;
    } else if (value === "done") {
      return filteredData;
    }
  };

  return (
    <div className="tasksContainer">
      <div className="toexeccute">
        <p className="taskTitle">DO WYKONANIA</p>
        <div className="taskColumn">{filterTasks("toexeccute")}</div>
      </div>
      <div className="inproggress">
        <p className="taskTitle">W TOKU</p>
        <div className="taskColumn">{filterTasks("inproggress")}</div>
      </div>
      <div className="done">
        <p className="taskTitle">ZROBIONE</p>
        <div className="taskColumn">{filterTasks("done")}</div>
      </div>
    </div>
  );
}

export default TaskList;
