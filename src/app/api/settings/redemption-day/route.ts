import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// 获取兑换日设置
export async function GET() {
  try {
    let setting = await db.setting.findUnique({
      where: { key: 'redemption_days' }
    })

    // 如果没有设置，创建默认设置（周五）
    if (!setting) {
      setting = await db.setting.create({
        data: {
          key: 'redemption_days',
          value: '5' // 默认周五
        }
      })
    }

    const selectedDays = setting.value.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d) && d >= 1 && d <= 7)

    return NextResponse.json({
      key: setting.key,
      value: setting.value,
      selectedDays,
      dayNames: selectedDays.map(d => getDayName(d)).join('、')
    })
  } catch (error) {
    console.error('获取兑换日设置失败:', error)
    return NextResponse.json({ error: '获取兑换日设置失败' }, { status: 500 })
  }
}

// 更新兑换日设置
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { selectedDays } = body

    if (!Array.isArray(selectedDays) || selectedDays.length === 0) {
      return NextResponse.json({ error: '至少选择一天' }, { status: 400 })
    }

    // 验证每个日期值
    for (const day of selectedDays) {
      const num = parseInt(day)
      if (isNaN(num) || num < 1 || num > 7) {
        return NextResponse.json({ error: '无效的日期值（1-7，1=周一，7=周日）' }, { status: 400 })
      }
    }

    // 去重并排序
    const uniqueDays = [...new Set(selectedDays.map(d => parseInt(d)))].sort((a, b) => a - b)

    const setting = await db.setting.upsert({
      where: { key: 'redemption_days' },
      update: { value: uniqueDays.join(',') },
      create: {
        key: 'redemption_days',
        value: uniqueDays.join(',')
      }
    })

    return NextResponse.json({
      key: setting.key,
      value: setting.value,
      selectedDays: uniqueDays,
      dayNames: uniqueDays.map(d => getDayName(d)).join('、')
    })
  } catch (error) {
    console.error('更新兑换日设置失败:', error)
    return NextResponse.json({ error: '更新兑换日设置失败' }, { status: 500 })
  }
}

function getDayName(day: number): string {
  const days = {
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周日'
  }
  return days[day as keyof typeof days] || '未知'
}
