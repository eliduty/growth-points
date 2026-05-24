import { NextRequest, NextResponse } from "next/server";
import { getFullUserInfo, handleAuthError } from "@/lib/auth/guard";

export async function GET(request: NextRequest) {
  try {
    const user = await getFullUserInfo(request);

    if (!user) {
      return NextResponse.json(
        { code: 4001, data: null, message: "未登录" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      code: 0,
      data: user,
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}