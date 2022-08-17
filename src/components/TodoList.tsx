import React, { useState } from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { useTodos } from "./useTodos";

const TodoList: React.FC = () => {
  const todos = useTodos();
  return (
    <>
      {todos.map((todo) => (
        <SingleTodo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default TodoList;
