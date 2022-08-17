import React, { useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { TodosProvider } from "./components/useTodos";

const App: React.FC = () => {
  const [todo, setTodo] = useState("");

  /* const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;
    setTodo("");
  };
 */
  return (
    <>
      <h1>Todos</h1>
      <InputField todo={todo} setTodo={setTodo} />
      <TodoList />
    </>
  );
};

const AppWrapper = () => (
  <TodosProvider
    initialTodos={[
      {
        id: 0,
        todo: "Hey there",
        isDone: false,
      },
    ]}
  >
    <App></App>
  </TodosProvider>
);

export default AppWrapper;
