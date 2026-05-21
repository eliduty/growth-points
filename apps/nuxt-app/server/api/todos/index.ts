export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  try {
    if (method === 'GET') {
      const todos = await prisma.todo.findMany({
        orderBy: { createdAt: 'desc' },
      })
      return todos
    }

    if (method === 'POST') {
      const body = await readBody(event)
      const { title, description } = body

      if (!title || title.trim() === '') {
        throw createError({ statusCode: 400, message: '标题不能为空' })
      }

      const todo = await prisma.todo.create({
        data: {
          title: title.trim(),
          description: description?.trim() || null,
        },
      })

      return todo
    }

    throw createError({ statusCode: 405, message: 'Method not allowed' })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }
    throw createError({ statusCode: 500, message: '操作失败' })
  }
})