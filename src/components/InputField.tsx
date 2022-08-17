import React from "react";
import { useAddTodos } from "./useTodos";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: React.FC<Props> = ({ todo, setTodo }) => {
  const addTodo = useAddTodos();

  return (
    <div>
      <input
        type="text"
        placeholder="add todo"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button onClick={() => addTodo(todo)}>Go</button>
    </div>
  );
};

export default InputField;
