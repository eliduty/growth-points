import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 获取本周任务完成记录
export async function GET(request: NextRequest) {
  try {
    // 优先从请求头获取 userId，如果不存在则从 cookie 获取
    const userId = request.headers.get('x-user-id') || request.cookies.get('userId')?.value

    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    // 获取本周的开始和结束时间（周一到周日）
    const now = new Date()
    const dayOfWeek = now.getDay() // 0-6, 0 is Sunday
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // adjust when day is Sunday
    const monday = new Date(now.setDate(diff))
    monday.setHours(0, 0, 0, 0)

    const sunday = new Date(monday)
    sunday.setDate(sunday.getDate() + 6)
    sunday.setHours(23, 59, 59, 999)

    // 获取本周所有完成记录（不包括已撤销的）
    const completions = await db.taskCompletion.findMany({
      where: {
        userId,
        completedAt: {
          gte: monday,
          lte: sunday
        },
        revoked: false
      },
      include: {
        task: true
      },
      orderBy: {
        completedAt: 'desc'
      }
    })

    // 计算总积分
    const totalPoints = completions.reduce((sum, completion) => {
      return sum + (completion.task?.points || 0)
    }, 0)

    return NextResponse.json({
      completions: completions.map(c => ({
        id: c.id,
        taskId: c.taskId,
        taskName: c.task?.name || '未知任务',
        taskPoints: c.task?.points || 0,
        completedAt: c.completedAt
      })),
      totalPoints,
      startDate: monday,
      endDate: sunday
    })
  } catch (error) {
    console.error('获取本周完成记录失败:', error)
    return NextResponse.json({ error: '获取本周完成记录失败' }, { status: 500 })
  }
}
