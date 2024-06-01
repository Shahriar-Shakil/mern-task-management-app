"use client";
import React, { createContext, useOptimistic } from "react";

type TodoContextType = {
  optimisticTodos: any;
  setOptimisticTodo: (action: any) => void;
};
export const TodosContext = createContext<TodoContextType | undefined>(
  undefined
);

export default function TodoContextProvider({
  children,
  todos,
}: {
  children: React.ReactNode;
  todos: [];
}) {
  const [optimisticTodos, setOptimisticTodo] = useOptimistic(
    todos,
    (state: any, { action, todo }) => {
      switch (action) {
        case "add":
          return [todo, ...state];
        case "delete":
          return state.filter((item: any) => !todo.includes(item._id));
        case "update":
          return state.map((item: any) => {
            if (item._id === todo._id) {
              return {
                ...todo,
              };
            }
            return item;
          });
      }
    }
  );
  return (
    <TodosContext.Provider value={{ optimisticTodos, setOptimisticTodo }}>
      {children}
    </TodosContext.Provider>
  );
}
export function useTodoContext() {
  const context = React.useContext(TodosContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoContextProvider");
  }
  return context;
}
