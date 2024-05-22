export { default } from "next-auth/middleware";

// Routes Middleware should not run on
export const config = {
  matcher: ["/"],
};
