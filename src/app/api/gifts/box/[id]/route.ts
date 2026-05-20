import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

// 更新礼物盒中的物品数量
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookiesList = await cookies()
    const userIdCookie = cookiesList.get('userId')?.value
    const userIdHeader = request.headers.get('x-user-id')
    const userId = userIdCookie || userIdHeader

    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const body = await request.json()
    const { quantity } = body

    const boxItem = await db.giftBox.findFirst({
      where: {
        id,
        userId
      },
      include: { gift: true }
    })

    if (!boxItem) {
      return NextResponse.json({ error: '礼物盒中未找到该物品' }, { status: 404 })
    }

    if (quantity <= 0) {
      return NextResponse.json({ error: '数量必须大于0' }, { status: 400 })
    }

    // 检查最大兑换份数
    if (boxItem.gift.maxRedeemable) {
      const existingRedemptions = await db.giftRedemption.count({
        where: {
          userId,
          giftId: boxItem.giftId
        }
      })

      if (existingRedemptions + quantity > boxItem.gift.maxRedeemable) {
        return NextResponse.json({
          error: `该礼物最多可兑换 ${boxItem.gift.maxRedeemable} 份，您已兑换 ${existingRedemptions} 份`
        }, { status: 400 })
      }
    }

    // 检查用户积分
    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    const requiredPoints = boxItem.gift.points * quantity
    if (requiredPoints > user.currentPoints) {
      return NextResponse.json({
        error: '积分不足',
        currentPoints: user.currentPoints,
        requiredPoints
      }, { status: 400 })
    }

    const updatedBoxItem = await db.giftBox.update({
      where: { id },
      data: { quantity }
    })

    return NextResponse.json({
      success: true,
      boxItem: {
        id: updatedBoxItem.id,
        giftId: updatedBoxItem.giftId,
        giftName: boxItem.gift.name,
        giftPoints: boxItem.gift.points,
        giftDescription: boxItem.gift.description,
        giftImage: boxItem.gift.image,
        maxRedeemable: boxItem.gift.maxRedeemable,
        quantity: updatedBoxItem.quantity,
        subtotal: boxItem.gift.points * updatedBoxItem.quantity
      }
    })
  } catch (error) {
    console.error('更新礼物盒失败:', error)
    return NextResponse.json({ error: '更新礼物盒失败' }, { status: 500 })
  }
}

// 从礼物盒中移除物品
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookiesList = await cookies()
    const userIdCookie = cookiesList.get('userId')?.value
    const userIdHeader = request.headers.get('x-user-id')
    const userId = userIdCookie || userIdHeader

    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const boxItem = await db.giftBox.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!boxItem) {
      return NextResponse.json({ error: '礼物盒中未找到该物品' }, { status: 404 })
    }

    await db.giftBox.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('从礼物盒移除失败:', error)
    return NextResponse.json({ error: '从礼物盒移除失败' }, { status: 500 })
  }
}
