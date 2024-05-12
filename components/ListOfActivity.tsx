import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_TASK } from "@/lib/API";
import { cn } from "@/lib/utils";

const tags = Array.from({ length: 3 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
type Props = {};
async function getTasks() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("session")?.value;
  const res = await fetch(API_TASK, {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function ListOfActivity({}: Props) {
  const tasks = await getTasks();
  console.log(tasks);
  return (
    <ScrollArea className="h-72 w-full rounded-md ">
      <div className="">
        {tasks.map((task: any) => (
          <div key={task._id} className="border-b border-gray-100">
            <div className="  sm:px-4 py-2 flex w-full h-16 px-6 text-lg leading-tight text-gray-700 items-center bg-white dark:bg-input-dark   appearance-none  dark:text-gray-300 ">
              <Button
                variant={"outline"}
                className={cn(`bg-transparent  border-none`)}
              >
                <img src="/images/circle.svg" alt="icon" />
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
                className={cn(`bg-transparent  border-none`)}
              >
                <img src="/images/icon-cross.svg" alt="icon" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
