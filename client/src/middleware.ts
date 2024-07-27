import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { makeStore } from "./lib/store";
import { updateCurrentUser } from "./lib/slices/app.slice";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (token) {
    const cookieString = `token=${token}`;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/info`,
        {
          headers: {
            Cookie: cookieString,
          },
          withCredentials: true,
        }
      );

      const user = response.data;
      const store = makeStore()
      store.dispatch(updateCurrentUser(user))
    } catch (error: any) {
      console.error("Error fetching user info:", error.response.data.message);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
