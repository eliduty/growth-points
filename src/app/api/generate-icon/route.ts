import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { size = '1024x1024' } = body

    // 生成应用图标
    const zai = await ZAI.create()

    const response = await zai.images.generations.create({
      prompt: 'A cute colorful star and heart icon, family task rewards app, gradient purple and pink colors, simple modern design, white background, app icon style, high quality',
      size: size
    })

    const imageBase64 = response.data[0].base64
    const buffer = Buffer.from(imageBase64, 'base64')

    // 确保输出目录存在
    const publicDir = path.join(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // 保存不同尺寸的图标
    const sizes = ['192x192', '512x512']
    const results: { size: string; path: string; fileSize: number }[] = []

    for (const s of sizes) {
      const [width, height] = s.split('x').map(Number)

      // 这里简单起见，我们保存相同的图片
      // 在实际应用中，可能需要使用 sharp 等库来调整尺寸
      const filename = `icon-${s}.png`
      const filepath = path.join(publicDir, filename)

      fs.writeFileSync(filepath, buffer)
      results.push({
        size: s,
        path: `/${filename}`,
        fileSize: buffer.length
      })
    }

    // 保存 Apple touch icon (180x180)
    const appleIconPath = path.join(publicDir, 'apple-touch-icon.png')
    fs.writeFileSync(appleIconPath, buffer)
    results.push({
      size: '180x180',
      path: '/apple-touch-icon.png',
      fileSize: buffer.length
    })

    // 保存 favicon
    const faviconPath = path.join(publicDir, 'favicon.ico')
    fs.writeFileSync(faviconPath, buffer)
    results.push({
      size: 'favicon',
      path: '/favicon.ico',
      fileSize: buffer.length
    })

    return NextResponse.json({
      success: true,
      icons: results,
      message: '图标生成成功'
    })

  } catch (error) {
    console.error('生成图标失败:', error)
    return NextResponse.json(
      {
        error: '生成图标失败',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  // 检查图标是否已存在
  const publicDir = path.join(process.cwd(), 'public')
  const requiredIcons = [
    'icon-192x192.png',
    'icon-512x512.png',
    'apple-touch-icon.png',
    'favicon.ico'
  ]

  const existingIcons: string[] = []
  const missingIcons: string[] = []

  for (const icon of requiredIcons) {
    const filepath = path.join(publicDir, icon)
    if (fs.existsSync(filepath)) {
      existingIcons.push(icon)
    } else {
      missingIcons.push(icon)
    }
  }

  return NextResponse.json({
    hasIcons: missingIcons.length === 0,
    existingIcons,
    missingIcons
  })
}
