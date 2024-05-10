import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const tags = Array.from({ length: 3 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
type Props = {};

export default function ListOfActivity({}: Props) {
  return (
    <ScrollArea className="h-72 w-full rounded-md ">
      <div className="">
        {tags.map((tag) => (
          <div key={tag} className="border-b border-gray-100">
            <div className="  sm:px-4 py-2 flex w-full h-16 px-6 text-lg leading-tight text-gray-700 items-center bg-white dark:bg-input-dark   appearance-none  dark:text-gray-300 ">
              <Button
                variant={"outline"}
                className={cn(`bg-transparent  border-none`)}
              >
                <img src="/images/circle.svg" alt="icon" />
              </Button>
              <p className="flex flex-1  my-auto align-middle border-none cursor-pointer input hover:text-blue-600">
                {/* {item.status === "Completed" ? (
                            <strike>{item.text}</strike>
                          ) : (
                            item.text
                          )} */}
                some task
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
