import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth/session";

export async function POST() {
  try {
    await clearSession();

    return NextResponse.json({
      code: 0,
      data: null,
      message: "已退出登录",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { code: 5001, data: null, message: "退出失败，请重试" },
      { status: 500 }
    );
  }
}