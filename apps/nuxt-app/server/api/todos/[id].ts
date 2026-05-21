export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, message: '缺少 ID 参数' })
  }

  try {
    if (method === 'GET') {
      const todo = await prisma.todo.findUnique({ where: { id } })
      if (!todo) {
        throw createError({ statusCode: 404, message: '待办事项不存在' })
      }
      return todo
    }

    if (method === 'PUT') {
      const body = await readBody(event)
      const { title, description, completed } = body

      const existingTodo = await prisma.todo.findUnique({ where: { id } })
      if (!existingTodo) {
        throw createError({ statusCode: 404, message: '待办事项不存在' })
      }

      const updateData: { title?: string; description?: string | null; completed?: boolean } = {}

      if (title !== undefined) {
        if (title.trim() === '') {
          throw createError({ statusCode: 400, message: '标题不能为空' })
        }
        updateData.title = title.trim()
      }

      if (description !== undefined) {
        updateData.description = description?.trim() || null
      }

      if (completed !== undefined) {
        updateData.completed = completed
      }

      const todo = await prisma.todo.update({ where: { id }, data: updateData })
      return todo
    }

    if (method === 'DELETE') {
      const existingTodo = await prisma.todo.findUnique({ where: { id } })
      if (!existingTodo) {
        throw createError({ statusCode: 404, message: '待办事项不存在' })
      }

      await prisma.todo.delete({ where: { id } })
      return { message: '删除成功' }
    }

    throw createError({ statusCode: 405, message: 'Method not allowed' })
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }
    throw createError({ statusCode: 500, message: '操作失败' })
  }
})