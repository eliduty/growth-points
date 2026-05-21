<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from '~/types/todo'

const props = defineProps<{
  todo: Todo
  isUpdating?: boolean
}>()

const emit = defineEmits<{
  update: [id: string, data: { completed?: boolean }]
  delete: [id: string]
}>()

const isDeleting = ref(false)

const handleToggle = () => {
  emit('update', props.todo.id, { completed: !props.todo.completed })
}

const handleDelete = () => {
  if (confirm('确定要删除这个待办事项吗？')) {
    isDeleting.value = true
    emit('delete', props.todo.id)
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('zh-CN')
}
</script>

<template>
  <div
    :class="[
      'flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200',
      todo.completed ? 'opacity-60' : '',
      isDeleting ? 'opacity-50' : '',
    ]"
  >
    <input
      type="checkbox"
      :checked="todo.completed"
      :disabled="isUpdating || isDeleting"
      @change="handleToggle"
      class="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
    />
    <div class="flex-1 min-w-0">
      <h3
        :class="[
          'text-base font-medium',
          todo.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100',
        ]"
      >
        {{ todo.title }}
      </h3>
      <p v-if="todo.description" class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {{ todo.description }}
      </p>
      <p class="mt-2 text-xs text-gray-400">
        创建于: {{ formatDate(todo.createdAt) }}
      </p>
    </div>
    <button
      :disabled="isUpdating || isDeleting"
      @click="handleDelete"
      class="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      删除
    </button>
  </div>
</template>