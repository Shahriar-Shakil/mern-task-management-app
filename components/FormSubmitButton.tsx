import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
  loading: boolean;
};

export default function FormSubmitButton({ children, loading }: Props) {
  return (
    <Button type="submit" className="w-full mt-5" disabled={loading}>
      {loading ? (
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
