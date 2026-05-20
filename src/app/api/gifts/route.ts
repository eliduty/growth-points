import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 获取所有礼物
export async function GET() {
  try {
    const gifts = await db.gift.findMany({
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json(gifts)
  } catch (error) {
    console.error('获取礼物失败:', error)
    return NextResponse.json({ error: '获取礼物失败' }, { status: 500 })
  }
}

// 创建礼物
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, points, description } = body

    if (!name || !points) {
      return NextResponse.json({ error: '礼物名称和所需积分不能为空' }, { status: 400 })
    }

    if (points < 0) {
      return NextResponse.json({ error: '积分不能为负数' }, { status: 400 })
    }

    const gift = await db.gift.create({
      data: {
        name,
        points: parseInt(points),
        description: description || null,
        available: true
      }
    })

    return NextResponse.json(gift)
  } catch (error) {
    console.error('创建礼物失败:', error)
    return NextResponse.json({ error: '创建礼物失败' }, { status: 500 })
  }
}
