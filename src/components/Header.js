import React from "react";

const Header = ({
  user,
  timeHeader,
  popupClick,
  taskOnChange,
  newTaskCategory,
  newTaskTypeClick,
}) => {
  const timerHeaderString = JSON.stringify(timeHeader);
  return (
    <header className="App-header">
      {timerHeaderString.length === 2 ? (
        <div className="header">
          {user === "pm" ? (
            <>
              <div>
                <button onClick={newTaskTypeClick}>
                  UTWÓRZ NOWĄ KATEGORIE ZADANIA
                </button>
                <input
                  id="taskType"
                  value={newTaskCategory}
                  onChange={(e) => taskOnChange(e)}
                ></input>
              </div>
              <button onClick={popupClick}>UTWÓRZ NOWE ZADANIE</button>
            </>
          ) : null}
          <p className="timerDate">--.--.----</p>
          <p className="timerClock">--:--</p>
        </div>
      ) : (
        timeHeader.map((time, index) => {
          return (
            <div className="header" key={index}>
              {user === "pm" ? (
                <>
                  <div>
                    <button onClick={newTaskTypeClick}>
                      UTWÓRZ NOWĄ KATEGORIE ZADANIA
                    </button>
                    <input
                      id="taskType"
                      value={newTaskCategory}
                      onChange={(e) => taskOnChange(e)}
                    ></input>
                  </div>
                  <button onClick={popupClick}>UTWÓRZ NOWE ZADANIE</button>
                </>
              ) : null}
              <p className="timerDate">{time.date.replaceAll("-", ".")}</p>
              <p className="timerClock">
                {time.hours > 1 ? time.hours : `0${time.hours}`}:
                {time.minutes > 9 ? time.minutes : `0${time.minutes}`}
              </p>
            </div>
          );
        })
      )}
    </header>
  );
};

export default Header;
