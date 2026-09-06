import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./session";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";

export async function requireAuth(request: NextRequest): Promise<{ userId: string; role: Role; familyId: string }> {
  const payload = await getSessionFromRequest(request);
  if (!payload?.userId || !payload?.role || !payload?.familyId) {
    throw new Error("UNAUTHORIZED");
  }
  return { userId: payload.userId, role: payload.role, familyId: payload.familyId };
}

export async function requireParent(request: NextRequest): Promise<{ userId: string; familyId: string }> {
  const { userId, role, familyId } = await requireAuth(request);
  if (role !== "PARENT") throw new Error("FORBIDDEN");
  return { userId, familyId };
}

export async function requireChild(request: NextRequest): Promise<{ userId: string; familyId: string }> {
  const { userId, role, familyId } = await requireAuth(request);
  if (role !== "CHILD") throw new Error("FORBIDDEN");
  return { userId, familyId };
}

export async function getFullUserInfo(request: NextRequest) {
  const payload = await getSessionFromRequest(request);
  if (!payload?.userId) return null;

  return prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      username: true,
      role: true,
      familyId: true,
      timezoneOffset: true,
      currentPoints: true,
      totalPoints: true,
    },
  });
}

export function handleAuthError(error: unknown): NextResponse {
  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { code: 4001, data: null, message: "未登录" },
        { status: 401 }
      );
    }
    if (error.message === "FORBIDDEN") {
      return NextResponse.json(
        { code: 4002, data: null, message: "无权限" },
        { status: 403 }
      );
    }
  }
  return NextResponse.json(
    { code: 5001, data: null, message: "服务器错误" },
    { status: 500 }
  );
}
