import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
};

export default function FormSubmitButton({ children }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full mt-5" disabled={pending}>
      {pending ? (
        <>
          {" "}
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
