import React from "react";

function Header(props) {
  const timerHeaderString = JSON.stringify(props.timeHeader);
  return (
    <header className="App-header">
      {timerHeaderString.length === 2 ? (
        <div className="header">
          <button onClick={props.popupClick}>UTWÓRZ NOWE ZADANIE</button>
          <p className="timerDate">--.--.----</p>
          <p className="timerClock">--:--</p>
        </div>
      ) : (
        props.timeHeader.map((time, index) => {
          return (
            <div className="header" key={index}>
              <button onClick={props.popupClick}>UTWÓRZ NOWE ZADANIE</button>
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
}

export default Header;
