import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { useDoneTodos, useRemoveTodos, useTodos } from "./useTodos";

interface Props {
  todo: Todo;
}

const SingleTodo: React.FC<Props> = ({ todo }) => {
  const todos = useTodos();
  const removeTodo = useRemoveTodos();
  const doneTodo = useDoneTodos();

  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.todo);

  const updateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTodoList = todos.map((td) =>
      td.id === todo.id ? { ...td, todo: editTodo } : td
    );
    //setTodos([...updatedTodoList]);
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <div>
      {edit ? (
        <form onSubmit={updateTodo}>
          <input
            type="text"
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            ref={inputRef}
          />
          <button type="submit">update</button>
        </form>
      ) : !todo.isDone ? (
        <span>{todo.todo}</span>
      ) : (
        <s>{todo.todo}</s>
      )}

      {!edit && (
        <>
          <button onClick={() => setEdit(true)}>edit</button>
          <button onClick={() => removeTodo(todo.id)}>delete</button>
          <button onClick={() => doneTodo(todo.id)}>done</button>
        </>
      )}
    </div>
  );
};

export default SingleTodo;
