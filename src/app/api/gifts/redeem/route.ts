import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 兑换礼物
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { giftId } = body

    if (!giftId) {
      return NextResponse.json({ error: '礼物ID不能为空' }, { status: 400 })
    }

    // 获取当前登录用户
    // 优先从请求头获取 userId，如果不存在则从 cookie 获取
    const userId = request.headers.get('x-user-id') || request.cookies.get('userId')?.value

    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    // 获取礼物
    const gift = await db.gift.findUnique({
      where: { id: giftId }
    })

    if (!gift) {
      return NextResponse.json({ error: '礼物不存在' }, { status: 404 })
    }

    if (!gift.available) {
      return NextResponse.json({ error: '该礼物暂不可用' }, { status: 400 })
    }

    if (user.currentPoints < gift.points) {
      return NextResponse.json({ error: '积分不足' }, { status: 400 })
    }

    // 创建兑换记录
    await db.giftRedemption.create({
      data: {
        userId,
        giftId,
        pointsSpent: gift.points
      }
    })

    // 更新用户积分
    await db.user.update({
      where: { id: userId },
      data: {
        currentPoints: { decrement: gift.points }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('兑换礼物失败:', error)
    return NextResponse.json({ error: '兑换礼物失败' }, { status: 500 })
  }
}
