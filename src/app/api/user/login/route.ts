import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

// 登录
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, password } = body

    if (!userId) {
      return NextResponse.json({ error: '用户ID不能为空' }, { status: 400 })
    }

    if (!password) {
      return NextResponse.json({ error: '密码不能为空' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json({ error: '密码错误' }, { status: 401 })
    }

    // 返回响应并设置 cookie
    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      role: user.role,
      currentPoints: user.currentPoints,
      totalPoints: user.totalPoints,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })

    // 同时设置 cookie 和在响应头中返回 userId
    response.cookies.set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 天
    })

    response.headers.set('x-user-id', user.id)

    console.log('登录成功 - 用户ID:', user.id, 'Cookie已设置')

    return response
  } catch (error) {
    console.error('登录失败:', error)
    return NextResponse.json({ error: '登录失败' }, { status: 500 })
  }
}
