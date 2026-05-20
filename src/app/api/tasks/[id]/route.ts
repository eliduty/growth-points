import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 删除任务
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // 检查任务是否存在
    const task = await db.task.findUnique({
      where: { id }
    })

    if (!task) {
      return NextResponse.json({ error: '任务不存在' }, { status: 404 })
    }

    // 删除任务（会级联删除相关的完成记录）
    await db.task.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除任务失败:', error)
    return NextResponse.json({ error: '删除任务失败' }, { status: 500 })
  }
}
