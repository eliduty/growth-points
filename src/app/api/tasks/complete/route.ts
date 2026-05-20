import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 完成任务
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId } = body

    if (!taskId) {
      return NextResponse.json({ error: '任务ID不能为空' }, { status: 400 })
    }

    // 获取当前登录用户
    // 优先从请求头获取 userId，如果不存在则从 cookie 获取
    console.log('完成任务 - 收到的所有headers:', Array.from(request.headers.keys()))
    const userId = request.headers.get('x-user-id') || request.cookies.get('userId')?.value

    console.log('完成任务 - userId from headers/cookies:', userId)

    if (!userId) {
      console.log('完成任务失败: 未登录')
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    // 获取任务
    const task = await db.task.findUnique({
      where: { id: taskId }
    })

    if (!task) {
      return NextResponse.json({ error: '任务不存在' }, { status: 404 })
    }

    // 检查今天是否已完成（不包括已撤销的）
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

    const existingCompletion = await db.taskCompletion.findFirst({
      where: {
        taskId,
        userId,
        completedAt: {
          gte: today,
          lt: tomorrow
        },
        revoked: false
      }
    })

    if (existingCompletion) {
      return NextResponse.json({ error: '该任务今天已完成' }, { status: 400 })
    }

    // 创建完成记录
    await db.taskCompletion.create({
      data: {
        userId,
        taskId
      }
    })

    // 更新用户积分
    await db.user.update({
      where: { id: userId },
      data: {
        currentPoints: { increment: task.points },
        totalPoints: { increment: task.points }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('完成任务失败:', error)
    return NextResponse.json({ error: '完成任务失败' }, { status: 500 })
  }
}
