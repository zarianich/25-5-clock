const { useState, useContext, useEffect, useRef } = React;

const App = () => {
  const [type, setType] = useState('Session');
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(1500);
  const [text, setText] = useState('Start');
  const [timeoutId, setTimeoutId] = useState('');

  const audioClip = useRef(null);
  const breakIncBtn = useRef(null);
  const breakDecBtn = useRef(null);
  const sessionIncBtn = useRef(null);
  const sessionDecBtn = useRef(null);
  const typeText = useRef(null);
  const timeText = useRef(null);


  const stop = () => {
    clearTimeout(timeoutId);
  };

  const disableBtn = () => {
    breakIncBtn.current.disabled = true;
    breakDecBtn.current.disabled = true;
    sessionIncBtn.current.disabled = true;
    sessionDecBtn.current.disabled = true;
  };

  const enableBtn = () => {
    breakIncBtn.current.disabled = false;
    breakDecBtn.current.disabled = false;
    sessionIncBtn.current.disabled = false;
    sessionDecBtn.current.disabled = false;
  };

  //pause timer
  const pause = () => {
    stop();
    setText('Start');
    enableBtn();
  };

  //update time each second
  const waitOneSec = () => {
    return setTimeout(() => {
      setTime(prev => {
        if (prev > 0) {
          setTimeoutId(waitOneSec);
          return prev - 1;
        } else {
          return prev;
        }
      });
    }, 1000);
  };

  const playBeep = () => {
    audioClip.current.volume = 0.2;
    audioClip.current.play();
  };

  //start new timer and switch type if time reaches zero
  useEffect(() => {

    if (time <= 60) {
      if (!typeText.current.classList.contains('red-time')) {
        typeText.current.classList.add('red-time');
      }
      if (!timeText.current.classList.contains('red-time')) {
        timeText.current.classList.add('red-time');
      }
    } else {
      typeText.current.classList.remove('red-time');
      timeText.current.classList.remove('red-time');
    }

    if (time === 0) {
      stop();
      playBeep();
      if (type === 'Session') {
        setType(prev => {
          return 'Break';
        });
        setTime(breakLength * 60);
        setTimeoutId(waitOneSec);
      } else {
        setType(prev => {
          return 'Session';
        });
        setTime(sessionLength * 60);
        setTimeoutId(waitOneSec);
      }
    }

  }, [time]);

  //click start_stop
  const handleClick = () => {
    if (text === 'Start') {
      setTimeoutId(waitOneSec);
      setText('Pause');
      disableBtn();
    } else {
      pause();
    }
  };

  const pauseBeep = () => {
    audioClip.current.pause();
    audioClip.current.currentTime = 0;
  };

  //reset timer
  const reset = () => {
    pause();
    setBreakLength(5);
    setSessionLength(25);
    setType('Session');
    setTime(1500);
    pauseBeep();
  };


  //change length of the appropriate type
  const changeLength = e => {
    if (e.target.id === 'break-increment') {
      setBreakLength(prev => {
        if (type === 'Break') {
          setTime(prev => {
            return prev >= 3600 ? prev : prev + 60;
          });
        }
        return prev >= 60 ? 60 : prev + 1;
      });
    } else if (e.target.id === 'break-decrement') {
      setBreakLength(prev => {
        if (type === 'Break') {
          setTime(prev => {
            return prev <= 60 ? prev : prev - 60;
          });
        }
        return prev <= 1 ? 1 : prev - 1;
      });
    } else if (e.target.id === 'session-increment') {
      setSessionLength(prev => {
        if (type === 'Session') {
          setTime(prev => {
            return prev >= 3600 ? prev : prev + 60;
          });
        }
        return prev >= 60 ? 60 : prev + 1;
      });
    } else if (e.target.id === 'session-decrement') {
      setSessionLength(prev => {
        if (type === 'Session') {
          setTime(prev => {
            return prev <= 60 ? prev : prev - 60;
          });
        }
        return prev <= 1 ? 1 : prev - 1;
      });
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("audio", { id: "beep", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav", type: "audio/mpeg", ref: audioClip }), /*#__PURE__*/
    React.createElement("h1", null, "25 + 5 Clock"), /*#__PURE__*/
    React.createElement("div", { id: "controls" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", { id: "break-label" }, "Break Length"), /*#__PURE__*/
    React.createElement("div", { class: "center-items" }, /*#__PURE__*/
    React.createElement("button", { id: "break-increment", ref: breakIncBtn, onClick: changeLength }, "+"), /*#__PURE__*/
    React.createElement("p", { id: "break-length" }, breakLength), /*#__PURE__*/
    React.createElement("button", { id: "break-decrement", ref: breakDecBtn, onClick: changeLength }, "-"))), /*#__PURE__*/


    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", { id: "session-label" }, "Session Length"), /*#__PURE__*/
    React.createElement("div", { class: "center-items" }, /*#__PURE__*/
    React.createElement("button", { id: "session-increment", ref: sessionIncBtn, onClick: changeLength }, "+"), /*#__PURE__*/
    React.createElement("p", { id: "session-length" }, sessionLength), /*#__PURE__*/
    React.createElement("button", { id: "session-decrement", ref: sessionDecBtn, onClick: changeLength }, "-")))), /*#__PURE__*/



    React.createElement("div", { id: "timer" }, /*#__PURE__*/
    React.createElement("div", { id: "clock" }, /*#__PURE__*/
    React.createElement("p", { id: "timer-label", ref: typeText }, type), /*#__PURE__*/
    React.createElement("p", { id: "time-left", ref: timeText }, `${time / 60 < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60)}:${time % 60 < 10 ? '0' + time % 60 : time % 60}`)), /*#__PURE__*/

    React.createElement("div", { id: "timer-btns" }, /*#__PURE__*/
    React.createElement("button", { id: "start_stop", onClick: handleClick }, text), /*#__PURE__*/
    React.createElement("button", { id: "reset", onClick: reset }, "Reset")))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));