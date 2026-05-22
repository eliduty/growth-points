import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireChild } from "@/lib/auth/guard";
import { handleAuthError } from "@/lib/auth/guard";
import { getBeijingNow } from "@/lib/date";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await requireChild();
    const { id: taskId } = await params;

    // 查询任务
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: {
        id: true,
        points: true,
        deletedAt: true,
      },
    });

    if (!task || task.deletedAt) {
      return NextResponse.json(
        { code: 4003, data: null, message: "任务不存在" },
        { status: 404 }
      );
    }

    // 查询今天是否已完成该任务
    const now = getBeijingNow();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const existingCompletion = await prisma.taskCompletion.findFirst({
      where: {
        userId,
        taskId,
        completedAt: { gte: todayStart, lte: todayEnd },
        revokedAt: null,
      },
    });

    if (existingCompletion) {
      return NextResponse.json(
        { code: 2002, data: null, message: "今日已完成该任务" },
        { status: 400 }
      );
    }

    // 创建完成记录并增加积分
    const result = await prisma.$transaction([
      prisma.taskCompletion.create({
        data: {
          taskId,
          userId,
          points: task.points,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          currentPoints: { increment: task.points },
          totalPoints: { increment: task.points },
        },
      }),
    ]);

    return NextResponse.json({
      code: 0,
      data: {
        pointsEarned: task.points,
        currentPoints: result[1].currentPoints,
      },
      message: "任务已完成",
    });
  } catch (error) {
    console.error("Complete task error:", error);
    return handleAuthError(error);
  }
}
