import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  darkMode: 'class',
  theme: {
    colors: {
      primary: '#3b82f6',
      success: '#22c55e',
      danger: '#ef4444',
    },
  },
  shortcuts: {
    'btn-primary': 'bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors',
    'btn-danger': 'bg-danger text-white px-3 py-1 rounded-md hover:bg-danger/90 transition-colors',
    'card': 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4',
  },
})