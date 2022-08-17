import { createContext, useContext, useReducer } from "react";
import { Todo } from "../model";

type ActionType =
  | { type: "ADD"; todo: string }
  | { type: "REMOVE"; id: number }
  | { type: "DONE"; id: number };

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  doneTodo: () => {},
});

export function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (todo: string) => void;
  removeTodo: (id: number) => void;
  doneTodo: (id: number) => void;
} {
  const [todos, dispatch] = useReducer((todos: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...todos,
          { id: todos.length, todo: action.todo, isDone: false },
        ];

      case "REMOVE":
        return todos.filter(({ id }) => id !== action.id);

      case "DONE":
        return todos.map((todo) =>
          todo.id === action.id ? { ...todo, isDone: true } : todo
        );

      default:
        throw new Error();
    }
  }, initialTodos);

  const addTodo = (todo: string) => {
    dispatch({ type: "ADD", todo });
  };

  const removeTodo = (id: number) => {
    dispatch({ type: "REMOVE", id });
  };
  const doneTodo = (id: number) => {
    dispatch({ type: "DONE", id });
  };

  

  return { todos, addTodo, removeTodo, doneTodo };
}

export const TodosProvider: React.FC<{
  initialTodos: Todo[];
  children: React.ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);
  return todos;
};
export const useAddTodos = (): UseTodosManagerResult["addTodo"] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};
export const useRemoveTodos = (): UseTodosManagerResult["removeTodo"] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};
export const useDoneTodos = (): UseTodosManagerResult["doneTodo"] => {
  const { doneTodo } = useContext(TodoContext);
  return doneTodo;
};
