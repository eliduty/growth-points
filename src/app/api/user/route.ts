import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

// 获取当前登录用户
export async function GET(request: NextRequest) {
  try {
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

    return NextResponse.json(user)
  } catch (error) {
    console.error('获取用户失败:', error)
    return NextResponse.json({ error: '获取用户失败' }, { status: 500 })
  }
}

// 创建新用户（注册）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, password, role } = body

    if (!name || !password || !role) {
      return NextResponse.json({ error: '用户名、密码和角色不能为空' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: '密码长度至少为6位' }, { status: 400 })
    }

    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    if (!hasLetter || !hasNumber) {
      return NextResponse.json({ error: '密码必须包含字母和数字' }, { status: 400 })
    }

    if (role !== 'PARENT' && role !== 'CHILD') {
      return NextResponse.json({ error: '无效的角色' }, { status: 400 })
    }

    const existingUser = await db.user.findFirst({
      where: { name }
    })

    if (existingUser) {
      return NextResponse.json({ error: '用户名已存在' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.user.create({
      data: {
        name,
        password: hashedPassword,
        role,
        currentPoints: 0,
        totalPoints: 0,
      }
    })

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

    console.log('注册成功 - 用户ID:', user.id, 'Cookie已设置')

    return response
  } catch (error) {
    console.error('创建用户失败:', error)
    return NextResponse.json({ error: '创建用户失败' }, { status: 500 })
  }
}
