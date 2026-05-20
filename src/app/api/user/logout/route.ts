import { NextRequest, NextResponse } from 'next/server'

// 登出
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true })
    response.cookies.delete('userId')

    return response
  } catch (error) {
    console.error('登出失败:', error)
    return NextResponse.json({ error: '登出失败' }, { status: 500 })
  }
}
