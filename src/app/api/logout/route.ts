import { NextResponse } from "next/server";
import { clearSession } from "@/lib/session";

export async function POST() {
  try {
    await clearSession();
    return NextResponse.json({
      code: 0,
      data: null,
      message: "登出成功",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { code: 5000, data: null, message: "登出失败" },
      { status: 500 }
    );
  }
}
