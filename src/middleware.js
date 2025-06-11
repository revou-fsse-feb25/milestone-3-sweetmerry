import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/orders/:path*",
  ],
}; 