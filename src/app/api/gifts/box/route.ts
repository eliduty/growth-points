import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

// 获取礼物盒内容
export async function GET(request: NextRequest) {
  try {
    const cookiesList = await cookies()
    const userIdCookie = cookiesList.get('userId')?.value
    const userIdHeader = request.headers.get('x-user-id')
    const userId = userIdCookie || userIdHeader

    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const boxItems = await db.giftBox.findMany({
      where: { userId },
      include: { gift: true },
      orderBy: { createdAt: 'desc' }
    })

    const totalPoints = boxItems.reduce((sum, item) => sum + (item.gift.points * item.quantity), 0)

    const formattedBoxItems = boxItems.map(item => ({
      id: item.id,
      giftId: item.giftId,
      giftName: item.gift.name,
      giftPoints: item.gift.points,
      giftDescription: item.gift.description,
      giftImage: item.gift.image,
      maxRedeemable: item.gift.maxRedeemable,
      quantity: item.quantity,
      subtotal: item.gift.points * item.quantity
    }))

    return NextResponse.json({
      boxItems: formattedBoxItems,
      totalPoints
    })
  } catch (error) {
    console.error('获取礼物盒失败:', error)
    return NextResponse.json({ error: '获取礼物盒失败' }, { status: 500 })
  }
}

// 添加到礼物盒
export async function POST(request: NextRequest) {
  try {
    const cookiesList = await cookies()
    const userIdCookie = cookiesList.get('userId')?.value
    const userIdHeader = request.headers.get('x-user-id')
    const userId = userIdCookie || userIdHeader

    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const body = await request.json()
    const { giftId, quantity = 1 } = body

    if (!giftId) {
      return NextResponse.json({ error: '礼物ID不能为空' }, { status: 400 })
    }

    const gift = await db.gift.findUnique({
      where: { id: giftId }
    })

    if (!gift) {
      return NextResponse.json({ error: '礼物不存在' }, { status: 404 })
    }

    if (!gift.available) {
      return NextResponse.json({ error: '该礼物暂时不可用' }, { status: 400 })
    }

    // 检查最大兑换份数
    if (gift.maxRedeemable) {
      const existingRedemptions = await db.giftRedemption.count({
        where: {
          userId,
          giftId
        }
      })

      const existingBoxItems = await db.giftBox.findFirst({
        where: {
          userId,
          giftId
        }
      })

      const totalRedeemed = existingRedemptions + (existingBoxItems?.quantity || 0)

      if (totalRedeemed + quantity > gift.maxRedeemable) {
        return NextResponse.json({
          error: `该礼物最多可兑换 ${gift.maxRedeemable} 份，您已兑换/在盒子中有 ${totalRedeemed} 份`
        }, { status: 400 })
      }
    }

    // 检查用户积分是否足够
    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    const requiredPoints = gift.points * quantity
    if (requiredPoints > user.currentPoints) {
      return NextResponse.json({
        error: '积分不足',
        currentPoints: user.currentPoints,
        requiredPoints
      }, { status: 400 })
    }

    // 添加到礼物盒
    const boxItem = await db.giftBox.upsert({
      where: {
        userId_giftId: {
          userId,
          giftId
        }
      },
      update: {
        quantity: {
          increment: quantity
        }
      },
      create: {
        userId,
        giftId,
        quantity
      }
    })

    return NextResponse.json({
      success: true,
      boxItem: {
        id: boxItem.id,
        giftId: boxItem.giftId,
        giftName: gift.name,
        giftPoints: gift.points,
        giftDescription: gift.description,
        giftImage: gift.image,
        maxRedeemable: gift.maxRedeemable,
        quantity: boxItem.quantity,
        subtotal: gift.points * boxItem.quantity
      }
    })
  } catch (error) {
    console.error('添加到礼物盒失败:', error)
    return NextResponse.json({ error: '添加到礼物盒失败' }, { status: 500 })
  }
}
