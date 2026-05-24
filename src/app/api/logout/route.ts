import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/constants";

export async function POST() {
  const response = NextResponse.json({
    code: 0,
    data: null,
    message: "登出成功",
  });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
