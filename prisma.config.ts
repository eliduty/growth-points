import { defineConfig, env } from '@prisma/config'
import 'dotenv/config'

type Env = {
  DATABASE_URL?: string
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env<Env>('DATABASE_URL') || 'file:./dev.db',
  },
})
