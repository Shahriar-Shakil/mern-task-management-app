"use client";
import { startTransition } from "react";
import { deleteTaskAction, updateTaskAction } from "@/actions/task";
import { Button } from "@/components/ui/button";
import { useTodoContext } from "@/context/TodoContext";
import { cn } from "@/lib/utils";

export default function ListOfActivity() {
  const { optimisticTodos, setOptimisticTodo } = useTodoContext();
  const handleDelete = async (todo: any) => {
    let idToBeDeleted = new Array(todo._id);
    setOptimisticTodo({ action: "delete", todo });
    await deleteTaskAction(idToBeDeleted);
  };
  const handleUpdateTask = async (todo: any) => {
    setOptimisticTodo({
      action: "update",
      todo: { ...todo, completed: !todo.completed },
    });

    await updateTaskAction({
      id: todo._id,
      data: { completed: !todo.completed },
    });
  };
  return (
    <div className="">
      {optimisticTodos.map((task: any) => (
        <div key={task._id} className="border-b ">
          <div className="sm:px-4 py-2 flex w-full  px-6 text-lg leading-tight text-gray-700 items-center bg-white dark:bg-input-dark   appearance-none  dark:text-gray-300 ">
            <Button
              onClick={() => startTransition(() => handleUpdateTask(task))}
              variant={"outline"}
              className={cn(`bg-transparent  border-none hover:bg-transparent`)}
            >
              {task.completed ? (
                <img src="/images/circle-cheked.svg" alt="icon" />
              ) : (
                <img src="/images/circle.svg" alt="icon" />
              )}
            </Button>
            <p className="flex flex-1  my-auto align-middle border-none cursor-pointer input hover:text-blue-600">
              {task.completed ? (
                <span className="line-through">{task.title}</span>
              ) : (
                task.title
              )}
            </p>
            <Button
              variant={"outline"}
              className={cn(`bg-transparent  border-none hover:bg-transparent`)}
              onClick={() => startTransition(() => handleDelete(task))}
            >
              <img src="/images/icon-cross.svg" alt="icon" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
