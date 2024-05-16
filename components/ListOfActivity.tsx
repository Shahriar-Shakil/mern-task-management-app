"use client";
import { deleteTaskAction, updateTaskAction } from "@/actions/task";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tags = Array.from({ length: 3 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
type Props = {
  tasks: any;
};

export default function ListOfActivity({ tasks }: Props) {
  const handleDelete = async (id: string) => {
    await deleteTaskAction(id);
  };
  const handleUpdateTask = async (task: any) => {
    await updateTaskAction({
      id: task._id,
      data: { completed: !task.completed },
    });
  };
  return (
    <div className="">
      {tasks.map((task: any) => (
        <div key={task._id} className="border-b ">
          <div className="sm:px-4 py-2 flex w-full  px-6 text-lg leading-tight text-gray-700 items-center bg-white dark:bg-input-dark   appearance-none  dark:text-gray-300 ">
            <Button
              onClick={() => handleUpdateTask(task)}
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
              onClick={() => handleDelete(task._id)}
            >
              <img src="/images/icon-cross.svg" alt="icon" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
