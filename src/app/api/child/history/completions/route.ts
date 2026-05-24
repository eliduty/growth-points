import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireChild, handleAuthError } from "@/lib/auth/guard";
import { getWeekStart, getWeekEnd, formatBeijingDate, formatBeijingTime, getBeijingNow } from "@/lib/date";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await requireChild(request);

    // 获取周数参数（可选，默认4周）
    const weeksParam = request.nextUrl.searchParams.get("weeks");
    const weeks = weeksParam ? parseInt(weeksParam, 10) : 4;
    const validWeeks = isNaN(weeks) || weeks < 1 ? 4 : weeks;

    const now = getBeijingNow();
    const currentWeekStart = getWeekStart(now);

    // 准备周数据
    const weeksData = [];

    for (let i = 0; i < validWeeks; i++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(weekStart.getDate() - i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      // 查询本周的任务完成记录
      const completions = await prisma.taskCompletion.findMany({
        where: {
          userId,
          completedAt: { gte: weekStart, lte: weekEnd },
        },
        include: {
          task: {
            select: { name: true },
          },
        },
        orderBy: {
          completedAt: "desc",
        },
      });

      // 只返回未撤销的记录用于详细列表
      const activeCompletions = completions.filter((c) => c.revokedAt === null);

      const completionsData = activeCompletions.map((c) => ({
        id: c.id,
        taskName: c.task.name,
        points: c.points,
        completedAt: formatBeijingTime(c.completedAt),
        revoked: c.revokedAt !== null,
      }));

      // 统计汇总（只计算未撤销的）
      const completedCount = activeCompletions.length;
      const totalPoints = activeCompletions.reduce((sum, c) => sum + c.points, 0);

      weeksData.push({
        weekRange: {
          start: formatBeijingDate(weekStart),
          end: formatBeijingDate(weekEnd),
        },
        completions: completionsData,
        summary: {
          completed: completedCount,
          points: totalPoints,
        },
      });
    }

    return NextResponse.json({
      code: 0,
      data: weeksData,
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}
