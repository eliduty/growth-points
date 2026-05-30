import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireChild } from "@/lib/auth/guard";
import { handleAuthError } from "@/lib/auth/guard";
import { getWeekStart, getWeekEnd, formatBeijingTime, getBeijingNow, isAvailableToday, formatAvailableDaysDisplay } from "@/lib/date";
import dayjs from "dayjs";

export async function GET(request: NextRequest) {
  try {
    const { userId, familyId } = await requireChild(request);

    // 获取日期参数（可选）
    const dateParam = request.nextUrl.searchParams.get("date");
    const targetDate = dateParam ? dayjs(dateParam) : getBeijingNow();

    // 计算本周时间范围
    const weekStart = getWeekStart();
    const weekEnd = getWeekEnd();

    // 查询用户积分信息
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentPoints: true,
        totalPoints: true,
        taskCompletions: {
          where: {
            completedAt: { gte: weekStart, lte: weekEnd },
            revokedAt: null,
          },
          select: { points: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { code: 4003, data: null, message: "用户不存在" },
        { status: 404 }
      );
    }

    // 查询本周奖励积分
    const weeklyRewards = await prisma.reward.findMany({
      where: {
        userId,
        createdAt: { gte: weekStart, lte: weekEnd },
      },
      select: { points: true },
    });
    const weeklyRewardPoints = weeklyRewards.reduce((sum, r) => sum + r.points, 0);

    // 本周获得积分（任务 + 奖励）
    const weeklyPoints = user.taskCompletions.reduce((sum, c) => sum + c.points, 0) + weeklyRewardPoints;

    // 查询家庭所有类别（按 order 排序）
    const categories = await prisma.category.findMany({
      where: { familyId },
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        order: true,
        tasks: {
          where: { deletedAt: null, availableDays: { not: null } },
          select: {
            id: true,
            name: true,
            points: true,
            description: true,
            availableDays: true,
          },
        },
      },
    });

    // 查询用户当天完成的任务
    const todayStart = targetDate.startOf("day").toDate();
    const todayEnd = targetDate.endOf("day").toDate();

    const todayCompletions = await prisma.taskCompletion.findMany({
      where: {
        userId,
        completedAt: { gte: todayStart, lte: todayEnd },
        revokedAt: null,
      },
      select: {
        taskId: true,
        completedAt: true,
      },
    });

    const completedTaskIds = new Set(todayCompletions.map((c) => c.taskId));

    // 处理数据
    const categoriesWithTasks = categories.map((category) => ({
      id: category.id,
      name: category.name,
      order: category.order,
      tasks: category.tasks.map((task) => ({
        id: task.id,
        name: task.name,
        points: task.points,
        description: task.description,
        categoryId: category.id,
        categoryName: category.name,
        categoryOrder: category.order,
        completed: completedTaskIds.has(task.id),
        completedAt: completedTaskIds.has(task.id)
          ? formatBeijingTime(todayCompletions.find((c) => c.taskId === task.id)!.completedAt)
          : null,
        availableDays: task.availableDays,
        isAvailableToday: isAvailableToday(task.availableDays),
        availableDaysDisplay: formatAvailableDaysDisplay(task.availableDays),
      })),
    }));

    // 已完成列表
    const completedTasks = categoriesWithTasks
      .flatMap((c) => c.tasks)
      .filter((t) => t.completed)
      .map((t) => ({
        id: t.id,
        taskName: t.name,
        points: t.points,
        completedAt: t.completedAt!,
      }));

    return NextResponse.json({
      code: 0,
      data: {
        pointsOverview: {
          current: user.currentPoints,
          total: user.totalPoints,
          weekly: weeklyPoints,
        },
        categories: categoriesWithTasks,
        completedTasks,
      },
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}
