import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

// 获取北京时间
function getBeijingDate(): Date {
  const now = new Date()
  const utcTimestamp = now.getTime()
  const beijingOffset = 8 * 60 * 60 * 1000
  const beijingTimestamp = utcTimestamp + beijingOffset
  return new Date(beijingTimestamp)
}

// 检查今天是否可以兑换
export async function GET() {
  try {
    // 获取兑换日设置
    const setting = await db.setting.findUnique({
      where: { key: 'redemption_days' }
    })

    // 解析兑换日（逗号分隔）
    const redemptionDays = setting
      ? setting.value.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d) && d >= 1 && d <= 7)
      : [5] // 默认周五

    // 获取当前星期几（北京时间，1=周一, ..., 7=周日）
    const beijingNow = getBeijingDate()
    const currentDay = beijingNow.getDay() === 0 ? 7 : beijingNow.getDay()

    // 检查今天是否是兑换日
    const canRedeemToday = redemptionDays.includes(currentDay)

    // 计算下一次兑换日和距离天数
    let nextRedemptionDay: number | null = null
    let daysUntilNext = 0

    if (canRedeemToday) {
      // 如果今天是兑换日，计算距离兑换期结束的时间
      // 兑换期从 00:00:00 到 23:59:59
      const endOfDay = new Date(beijingNow)
      endOfDay.setHours(23, 59, 59, 999)

      // 计算距离今天结束的毫秒数
      const timeUntilEnd = endOfDay.getTime() - beijingNow.getTime()

      // 计算下一周的第一个兑换日
      const firstRedemptionDay = Math.min(...redemptionDays)
      const daysUntilFirstRedemption = (firstRedemptionDay - currentDay + 7) % 7 || 7
      nextRedemptionDay = daysUntilFirstRedemption === 0 ? currentDay : firstRedemptionDay
      daysUntilNext = daysUntilFirstRedemption

      return NextResponse.json({
        canRedeem: true,
        canRedeemToday,
        redemptionDays,
        currentDay,
        countdownMs: timeUntilEnd,
        countdownHours: Math.floor(timeUntilEnd / (1000 * 60 * 60)),
        countdownMinutes: Math.floor((timeUntilEnd % (1000 * 60 * 60)) / (1000 * 60)),
        countdownSeconds: Math.floor((timeUntilEnd % (1000 * 60)) / 1000),
        nextRedemptionDay,
        daysUntilNext,
        isRedemptionPeriod: true
      })
    } else {
      // 如果今天不是兑换日，计算距离下一个兑换日的天数
      const sortedDays = [...redemptionDays].sort((a, b) => a - b)
      let nextDay = sortedDays.find(day => day > currentDay)

      if (!nextDay) {
        // 如果没有大于今天的，取下周的第一个
        nextDay = sortedDays[0]
        daysUntilNext = (nextDay - currentDay + 7) % 7 || 7
      } else {
        daysUntilNext = nextDay - currentDay
      }

      // 计算距离下一个兑换日 00:00:00 的毫秒数
      const nextRedemptionDate = new Date(beijingNow)
      nextRedemptionDate.setDate(beijingNow.getDate() + daysUntilNext)
      nextRedemptionDate.setHours(0, 0, 0, 0)

      const timeUntilNext = nextRedemptionDate.getTime() - beijingNow.getTime()

      return NextResponse.json({
        canRedeem: false,
        canRedeemToday,
        redemptionDays,
        currentDay,
        countdownMs: timeUntilNext,
        countdownHours: Math.floor(timeUntilNext / (1000 * 60 * 60)),
        countdownMinutes: Math.floor((timeUntilNext % (1000 * 60 * 60)) / (1000 * 60)),
        countdownSeconds: Math.floor((timeUntilNext % (1000 * 60)) / 1000),
        nextRedemptionDay: nextDay,
        daysUntilNext,
        isRedemptionPeriod: false
      })
    }
  } catch (error) {
    console.error('检查兑换状态失败:', error)
    return NextResponse.json({ error: '检查兑换状态失败' }, { status: 500 })
  }
}

// 结算兑换
export async function POST(request: NextRequest) {
  try {
    const cookiesList = await cookies()
    const userIdCookie = cookiesList.get('userId')?.value
    const userIdHeader = request.headers.get('x-user-id')
    const userId = userIdCookie || userIdHeader

    if (!userId) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    // 检查今天是否可以兑换
    const setting = await db.setting.findUnique({
      where: { key: 'redemption_days' }
    })

    const redemptionDays = setting
      ? setting.value.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d) && d >= 1 && d <= 7)
      : [5] // 默认周五

    // 获取当前星期几（北京时间）
    const beijingNow = getBeijingDate()
    const currentDay = beijingNow.getDay() === 0 ? 7 : beijingNow.getDay()

    // 检查今天是否是兑换日
    const canRedeem = redemptionDays.includes(currentDay)

    if (!canRedeem) {
      return NextResponse.json({
        error: '今天不是兑换日',
        redemptionDays,
        currentDay
      }, { status: 400 })
    }

    // 获取礼物盒内容
    const boxItems = await db.giftBox.findMany({
      where: { userId },
      include: { gift: true }
    })

    if (boxItems.length === 0) {
      return NextResponse.json({ error: '礼物盒为空' }, { status: 400 })
    }

    // 计算总积分
    const totalPoints = boxItems.reduce((sum, item) => sum + (item.gift.points * item.quantity), 0)

    // 获取用户信息
    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }

    // 检查积分是否足够
    if (totalPoints > user.currentPoints) {
      return NextResponse.json({
        error: '积分不足',
        currentPoints: user.currentPoints,
        requiredPoints: totalPoints
      }, { status: 400 })
    }

    // 扣除积分
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        currentPoints: user.currentPoints - totalPoints,
        totalPoints: user.totalPoints + totalPoints
      }
    })

    // 创建兑换记录
    for (const item of boxItems) {
      for (let i = 0; i < item.quantity; i++) {
        await db.giftRedemption.create({
          data: {
            userId,
            giftId: item.giftId,
            pointsSpent: item.gift.points
          }
        })
      }
    }

    // 清空礼物盒
    await db.giftBox.deleteMany({
      where: { userId }
    })

    return NextResponse.json({
      success: true,
      pointsSpent: totalPoints,
      currentPoints: updatedUser.currentPoints,
      redeemedCount: boxItems.length
    })
  } catch (error) {
    console.error('结算失败:', error)
    return NextResponse.json({ error: '结算失败' }, { status: 500 })
  }
}
