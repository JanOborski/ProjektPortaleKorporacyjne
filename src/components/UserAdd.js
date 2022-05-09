import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { app } from "../resources/Firebase";

const UserAdd = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [street, setStreet] = useState("");
  const [userType, setUserType] = useState("selectOption");

  const db = getDatabase(app);

  const handleOnChange = (e) => {
    const inputType = e.target.id;
    const userInput = e.target.value;
    if (inputType === "name") {
      setName(userInput);
    } else if (inputType === "surname") {
      setSurname(userInput);
    } else if (inputType === "street") {
      setStreet(userInput);
    } else if (inputType === "userSelect") {
      setUserType(userInput);
    } else return null;
  };

  const dataToFirebase = (values) => {
    push(ref(db), { values });
  };

  const handleSubmit = (e) => {
    const inputValues = {
      name: name,
      surname: surname,
      street: street,
      userType: userType,
    };
    dataToFirebase(inputValues);
    e.preventDefault();
    alert(`New user: ${name} was added to database`);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Imię</label>
        <input
          onChange={(e) => handleOnChange(e)}
          type="text"
          value={name}
          id="name"
        ></input>
        <label>Nazwisko</label>
        <input
          onChange={(e) => handleOnChange(e)}
          type="text"
          value={surname}
          id="surname"
        ></input>
        <label>Ulica</label>
        <input
          onChange={(e) => handleOnChange(e)}
          type="text"
          id="street"
          value={street}
        ></input>
        <label>Typ użytkownika</label>
        <select
          value={userType}
          onChange={(e) => handleOnChange(e)}
          id="userSelect"
          className="userSelect"
        >
          <option value="selectOption" disabled>
            Select user type
          </option>
          <option value="admin">Admin</option>
          <option value="pm">Pm</option>
          <option value="user">User</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UserAdd;
