import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 获取所有任务
export async function GET() {
  try {
    const tasks = await db.task.findMany({
      orderBy: { createdAt: 'asc' }
    })

    // 检查每个任务今天是否已完成（不包括已撤销的）
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tasksWithStatus = await Promise.all(
      tasks.map(async (task) => {
        const completion = await db.taskCompletion.findFirst({
          where: {
            taskId: task.id,
            completedAt: {
              gte: today,
              lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            },
            revoked: false
          }
        })

        return {
          ...task,
          completedToday: !!completion
        }
      })
    )

    return NextResponse.json(tasksWithStatus)
  } catch (error) {
    console.error('获取任务失败:', error)
    return NextResponse.json({ error: '获取任务失败' }, { status: 500 })
  }
}

// 创建任务
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, points, description } = body

    if (!name || !points) {
      return NextResponse.json({ error: '任务名称和积分不能为空' }, { status: 400 })
    }

    if (points < 0) {
      return NextResponse.json({ error: '积分不能为负数' }, { status: 400 })
    }

    const task = await db.task.create({
      data: {
        name,
        points: parseInt(points),
        description: description || null
      }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('创建任务失败:', error)
    return NextResponse.json({ error: '创建任务失败' }, { status: 500 })
  }
}
