import { Card, CardContent, CardFooter } from "@/components/ui/card";
import InformationFilter from "../InformationFilter";
import InputArea from "../InputArea";
import ListOfActivity from "../ListOfActivity";
import { ModeToggle } from "../ModeToggle";
import UserDropdown from "../UserDropdown";

type Props = {};

export default async function Todo({}: Props) {
  return (
    <div className="relative z-10 flex h-auto max-w-xl px-10 mx-auto bg-yellow-3000 md:mx-auto">
      <div className="w-full mt-20 text-left ">
        <div className="flex justify-between align-middle">
          <h1 className="text-4xl font-bold text-white">T O D O</h1>
          <div className="flex align-middle gap-2">
            <UserDropdown />
            <ModeToggle />
          </div>
        </div>
        {/* Input */}
        <InputArea />
        <Card className="w-full">
          <CardContent className="p-0">
            <ListOfActivity />
          </CardContent>
          <CardFooter className="flex flex-col py-3">
            <InformationFilter />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
