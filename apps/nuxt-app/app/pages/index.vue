<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Todo } from '~/types/todo'

const todos = ref<Todo[]>([])
const isLoading = ref(true)
const isAdding = ref(false)
const updatingIds = ref(new Set<string>())
const error = ref<string | null>(null)

const fetchTodos = async () => {
  try {
    error.value = null
    const data = await $fetch<Todo[]>('/api/todos')
    todos.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : '获取待办事项失败'
  } finally {
    isLoading.value = false
  }
}

const handleAddTodo = async ({ title, description }: { title: string; description: string }) => {
  isAdding.value = true
  try {
    const newTodo = await $fetch<Todo>('/api/todos', {
      method: 'POST',
      body: { title, description: description || undefined },
    })
    todos.value.unshift(newTodo)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '创建待办事项失败'
  } finally {
    isAdding.value = false
  }
}

const handleUpdateTodo = async (id: string, data: { completed?: boolean }) => {
  updatingIds.value.add(id)
  try {
    const updatedTodo = await $fetch<Todo>(`/api/todos/${id}`, {
      method: 'PUT',
      body: data,
    })
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.value[index] = updatedTodo
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '更新待办事项失败'
  } finally {
    updatingIds.value.delete(id)
  }
}

const handleDeleteTodo = async (id: string) => {
  try {
    await $fetch(`/api/todos/${id}`, { method: 'DELETE' })
    todos.value = todos.value.filter((todo) => todo.id !== id)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '删除待办事项失败'
  }
}

const completedCount = computed(() => todos.value.filter((todo) => todo.completed).length)
const pendingCount = computed(() => todos.value.length - completedCount.value)

onMounted(() => {
  fetchTodos()
})
</script>

<template>
  <main class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          待办事项清单
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          管理你的任务，提高效率
        </p>
      </header>

      <div
        v-if="error"
        class="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-md text-red-700 dark:text-red-400"
      >
        {{ error }}
        <button @click="error = null" class="ml-2 text-red-900 dark:text-red-300 hover:underline">
          关闭
        </button>
      </div>

      <TodoForm :is-loading="isAdding" @submit="handleAddTodo" />

      <div class="flex gap-4 mb-4 text-sm">
        <div class="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
          待处理: {{ pendingCount }}
        </div>
        <div class="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
          已完成: {{ completedCount }}
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-8 text-gray-500 dark:text-gray-400">
        加载中...
      </div>

      <div v-else-if="todos.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        暂无待办事项，添加一个开始吧！
      </div>

      <div v-else class="space-y-3">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          :is-updating="updatingIds.has(todo.id)"
          @update="handleUpdateTodo"
          @delete="handleDeleteTodo"
        />
      </div>
    </div>
  </main>
</template>