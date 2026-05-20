import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 获取所有用户列表（用于登录选择）
export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: 'asc' }
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('获取用户列表失败:', error)
    return NextResponse.json({ error: '获取用户列表失败' }, { status: 500 })
  }
}
