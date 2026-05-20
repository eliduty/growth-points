import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 获取结算日期设置
export async function GET() {
  try {
    let setting = await db.setting.findUnique({
      where: { key: 'settlement-day' }
    })

    // 如果没有设置，创建默认设置（周五）
    if (!setting) {
      setting = await db.setting.create({
        data: {
          key: 'settlement-day',
          value: '5' // 默认周五
        }
      })
    }

    return NextResponse.json(setting)
  } catch (error) {
    console.error('获取设置失败:', error)
    return NextResponse.json({ error: '获取设置失败' }, { status: 500 })
  }
}

// 更新结算日期设置
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { value } = body

    if (value === undefined || value === null) {
      return NextResponse.json({ error: '设置值不能为空' }, { status: 400 })
    }

    const day = parseInt(value)
    if (isNaN(day) || day < 0 || day > 6) {
      return NextResponse.json({ error: '无效的日期值（0-6）' }, { status: 400 })
    }

    const setting = await db.setting.upsert({
      where: { key: 'settlement-day' },
      update: { value: value.toString() },
      create: {
        key: 'settlement-day',
        value: value.toString()
      }
    })

    return NextResponse.json(setting)
  } catch (error) {
    console.error('更新设置失败:', error)
    return NextResponse.json({ error: '更新设置失败' }, { status: 500 })
  }
}
