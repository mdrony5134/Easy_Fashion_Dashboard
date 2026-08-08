import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface User {
  userId: string;
  role: string;
  email: string;
  fullName: string;
  iat: number;
  exp: number;
}

export function proxy(request: NextRequest) {
  const loginRoute = new URL("/login", request.url);
  const currentPath = request.nextUrl.pathname;

  // Token Retrieval
  const token = request.cookies.get("token")?.value;

  if (currentPath === "/login") {
    if (token) {
      try {
        const userInfo = jwtDecode<User>(token);
        if (userInfo?.role === "SUPER_ADMIN" || userInfo?.role === "MANAGER") {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        } else if (userInfo?.role === "ADMIN") {
          return NextResponse.redirect(new URL("/products", request.url));
        }
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch {
        const response = NextResponse.next();
        response.cookies.delete("token");
        return response;
      }
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(loginRoute);
  }

  try {
    const userInfo = jwtDecode<User>(token);
    const role = userInfo?.role;

    if (role === "SUPER_ADMIN") {
      return NextResponse.next();
    }

    if (role === "ADMIN") {
      const adminAllowedRoutes = [
        "/products",
        "/product-attributes",
        "/users",
        "/order-list",
        "/dashboard",
      ];
      const hasAccess = adminAllowedRoutes.some((route) =>
        currentPath.startsWith(route),
      );

      if (!hasAccess) {
        return NextResponse.redirect(new URL("/products", request.url));
      }
      return NextResponse.next();
    }

    if (role === "MANAGER") {
      const managerAllowedRoutes = ["/dashboard", "/products", "/order-list"];
      const hasAccess = managerAllowedRoutes.some((route) =>
        currentPath.startsWith(route),
      );

      if (!hasAccess) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.next();
    }
    return NextResponse.redirect(loginRoute);
  } catch {
    const response = NextResponse.redirect(loginRoute);
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/order-list/:path*",
    "/product-attributes/:path*",
    "/products/:path*",
    "/settings/:path*",
    "/users/:path*",
    "/login",
  ],
};
