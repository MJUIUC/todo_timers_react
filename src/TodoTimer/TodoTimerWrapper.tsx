import React from "react";
import Todo, { ONE_SECOND_MS, TodoProps } from "./Todo";
import "./TodoTimerWrapper.css";

export default function TodoTimer() {
  const [todoList, setTodoList] = React.useState<TodoProps[]>([]);

  const handleInputSubmission = (event: any) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formInput: any = {};
    form.forEach((value, key) => {
      formInput[key] = value;
    });

    const { name, message, timeout } = formInput;
    if (!name || !message || !timeout) return;

    const newTodoProps: TodoProps = {
      name,
      message,
      timeoutTime: timeout * ONE_SECOND_MS,
      initTime: Date.now(),
    };

    setTodoList([...todoList, newTodoProps]);
  };

  return (
    <div className="TodoTimerWrapper-base-container">
      <div className="TodoTimerWrapper-header">
        <h1>Todo Timers</h1>
      </div>
      <div className="TodoTimerWrapper-body">
        <div className="TodoTimerWrapper-input-forum">
          <form onSubmit={handleInputSubmission}>
            <input type="text" name="name" placeholder="Todo Name" />
            <input type="text" name="message" placeholder="Todo Message" />
            <input
              type="number"
              min={0}
              name="timeout"
              placeholder="Todo Timeout in seconds"
            />
            <button type="submit">Add Todo Timer</button>
          </form>
        </div>
        <div className="TodoTimerWrapper-todo-container">
          {todoList.map(({ name, message, initTime, timeoutTime }, index) => {
            return (
              <Todo
                key={`${initTime}_${timeoutTime}_${name}_${index}`}
                name={name}
                message={message}
                initTime={initTime}
                timeoutTime={timeoutTime}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
