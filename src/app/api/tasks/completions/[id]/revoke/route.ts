import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 撤销任务完成
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // 优先从请求头获取 userId，如果不存在则从 cookie 获取
    const userId = request.headers.get('x-user-id') || request.cookies.get('userId')?.value

    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    // 检查当前用户是否是家长
    const currentUser = await db.user.findUnique({
      where: { id: userId }
    })

    if (!currentUser) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    if (currentUser.role !== 'PARENT') {
      return NextResponse.json({ error: '只有家长可以撤销任务' }, { status: 403 })
    }

    // 获取任务完成记录
    const completion = await db.taskCompletion.findUnique({
      where: { id },
      include: {
        task: true,
        user: true
      }
    })

    if (!completion) {
      return NextResponse.json({ error: '任务完成记录不存在' }, { status: 404 })
    }

    // 检查是否已经撤销
    if (completion.revoked) {
      return NextResponse.json({ error: '该任务已被撤销' }, { status: 400 })
    }

    // 扣除用户积分
    const taskPoints = completion.task?.points || 0

    // 检查用户是否有足够的积分
    if (completion.user.currentPoints < taskPoints) {
      return NextResponse.json(
        { error: '用户当前积分不足，无法撤销' },
        { status: 400 }
      )
    }

    // 标记任务完成为已撤销并记录时间
    await db.taskCompletion.update({
      where: { id },
      data: {
        revoked: true,
        revokedAt: new Date()
      }
    })

    // 扣除用户积分
    await db.user.update({
      where: { id: completion.userId },
      data: {
        currentPoints: { decrement: taskPoints },
        totalPoints: { decrement: taskPoints }
      }
    })

    return NextResponse.json({
      success: true,
      message: `已撤销任务"${completion.task?.name}"，扣除 ${taskPoints} 积分`
    })
  } catch (error) {
    console.error('撤销任务失败:', error)
    return NextResponse.json({ error: '撤销任务失败' }, { status: 500 })
  }
}
