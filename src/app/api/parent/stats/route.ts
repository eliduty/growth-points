import { NextResponse, NextRequest } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { getWeekStart, getWeekEnd, formatBeijingTime } from "@/lib/date";

export async function GET(request: NextRequest) {
  try {
    const { familyId } = await requireParent();

    // 获取可选的 weekStart 参数
    const weekStartParam = request.nextUrl.searchParams.get("weekStart");
    const weekStartDate = weekStartParam
      ? new Date(weekStartParam)
      : undefined;

    // 计算本周时间范围
    const weekStart = getWeekStart(weekStartDate);
    const weekEnd = getWeekEnd(weekStartDate);

    // 查询家庭内所有孩子
    const children = await prisma.user.findMany({
      where: {
        familyId,
        role: "CHILD",
      },
      select: {
        id: true,
        username: true,
        currentPoints: true,
        totalPoints: true,
        taskCompletions: {
          where: {
            completedAt: {
              gte: weekStart,
              lte: weekEnd,
            },
            revokedAt: null, // 未撤销的记录
          },
          select: {
            id: true,
            points: true,
            completedAt: true,
            task: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            completedAt: "desc",
          },
        },
      },
    });

    // 计算统计数据
    const stats = children.map((child) => {
      const weeklyCompleted = child.taskCompletions.length;
      const weeklyPoints = child.taskCompletions.reduce(
        (sum, c) => sum + c.points,
        0
      );

      return {
        id: child.id,
        username: child.username,
        currentPoints: child.currentPoints,
        totalPoints: child.totalPoints,
        weeklyCompleted,
        weeklyPoints,
        completions: child.taskCompletions.map((c) => ({
          id: c.id,
          taskId: c.task.id,
          taskName: c.task.name,
          points: c.points,
          completedAt: formatBeijingTime(c.completedAt),
        })),
      };
    });

    return NextResponse.json({
      code: 0,
      data: {
        weekRange: {
          start: formatBeijingTime(weekStart),
          end: formatBeijingTime(weekEnd),
        },
        children: stats,
      },
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}