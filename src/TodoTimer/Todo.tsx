import React, { useEffect } from "react";
import "./Todo.css";

export interface TodoProps {
  name: string;
  message: string;
  initTime: number;
  timeoutTime: number;
}

export const ONE_SECOND_MS = 1000;

export default function Todo ({ name, message, timeoutTime }: TodoProps) {
  const [show, setShow] = React.useState<boolean>(true);
  const [secondsElapsed, setSecondsElapsed] = React.useState<number>(1);
  const [isPaused, toggleIsPaused] = React.useState<boolean>(false);

  // It's hard to keep these in a state object because re-rendering the component while updating the state
  // object can cause the timer references to be lost. Using refs instead of state objects allows us to preserve
  // the timer references across re-renders.
  const currentInterval = React.useRef<NodeJS.Timeout | null>(null);
  const currentTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const toggleTimer = () => {
    if (isPaused) {
      // Resume timer
      const remainingTimeoutTime = timeoutTime - (secondsElapsed * ONE_SECOND_MS);
      const timeout = setTimeout(() => {
        setShow(false);
      }, remainingTimeoutTime);

      const interval = setInterval(() => {
        setSecondsElapsed(secondsElapsed + 1);
      }, ONE_SECOND_MS);

      currentTimeout.current = timeout;
      currentInterval.current = interval;
    } else {
      // Pause timer
      clearInterval(currentInterval.current!);
      clearTimeout(currentTimeout.current!);
    }
    toggleIsPaused(!isPaused);
  };

  const closeTimer = () => {
    setShow(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, timeoutTime);
    currentTimeout.current = timeout;

    return () => clearTimeout(currentTimeout.current!);
  }, [timeoutTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(secondsElapsed + 1);
    }, ONE_SECOND_MS);

    currentInterval.current = interval;

    return () => clearInterval(currentInterval.current!);
  }, [secondsElapsed]);

  if (!show) {
    return <></>;
  } else {
    return (
      <div className="Todo-base-container">
        <div className="Todo-header">
          <h1>{name}</h1>
          <label onClick={closeTimer}>X</label>
        </div>
        <div className="Todo-body">
          <div>
            <p>{message}</p>
            <p>{secondsElapsed}</p>
          </div>
          <button onClick={toggleTimer}>{isPaused ? "Resume" : "Pause"}</button>
        </div>
      </div>
    );
  }
};
