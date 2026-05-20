import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 删除礼物
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // 检查礼物是否存在
    const gift = await db.gift.findUnique({
      where: { id }
    })

    if (!gift) {
      return NextResponse.json({ error: '礼物不存在' }, { status: 404 })
    }

    // 删除礼物（会级联删除相关的兑换记录）
    await db.gift.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除礼物失败:', error)
    return NextResponse.json({ error: '删除礼物失败' }, { status: 500 })
  }
}
