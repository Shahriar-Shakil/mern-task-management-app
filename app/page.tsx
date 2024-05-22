import Todo from "@/components/parts/Todo";
import { setCompleted } from "@/context";

// import { authOptions } from "@/server/auth";

export default async function Home(props: any) {
  const { completed } = props.searchParams;
  setCompleted(completed);
  return (
    <div className="relative w-full min-h-screen bg-top bg-no-repeat bg-contain bg-bg-light dark:bg-bg-dark">
      <img
        src="/images/bg-desktop-light.jpg"
        alt="image light"
        className="absolute z-0 hidden object-cover w-full dark:opacity-0 sm:block"
        style={{ height: "300px" }}
      />

      {/* desktop dark */}
      <img
        src="/images/bg-desktop-dark.jpg"
        alt="image light"
        className="absolute z-0 hidden object-cover w-full opacity-0 dark:opacity-100 sm:block"
        style={{ height: "300px" }}
      />

      {/* mobile light */}
      <img
        src="/images/bg-mobile-light.jpg"
        alt="image light"
        className="absolute z-0 object-cover w-full opacity-100 dark:opacity-0 sm:hidden "
        style={{ height: "200px" }}
      />

      <img
        src="/images/bg-mobile-dark.jpg"
        alt="image light"
        className="absolute z-0 object-cover w-full opacity-0 dark:opacity-100 sm:hidden"
        style={{ height: "200px" }}
      />
      <Todo />
    </div>
  );
}
