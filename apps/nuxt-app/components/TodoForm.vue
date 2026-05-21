<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  submit: [{ title: string; description: string }]
}>()

const props = defineProps<{
  isLoading?: boolean
}>()

const title = ref('')
const description = ref('')

const handleSubmit = () => {
  if (title.value.trim()) {
    emit('submit', { title: title.value.trim(), description: description.value.trim() })
    title.value = ''
    description.value = ''
  }
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6"
  >
    <div class="space-y-3">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          标题 <span class="text-red-500">*</span>
        </label>
        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="输入待办事项标题..."
          required
          :disabled="isLoading"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          描述 <span class="text-gray-400">(可选)</span>
        </label>
        <textarea
          id="description"
          v-model="description"
          placeholder="添加详细描述..."
          rows="2"
          :disabled="isLoading"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>
      <button
        type="submit"
        :disabled="isLoading || !title.trim()"
        class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? '添加中...' : '添加待办事项' }}
      </button>
    </div>
  </form>
</template>