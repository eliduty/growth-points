import { defineConfig } from '@prisma/config'
import 'dotenv/config'

type Env = {
  DATABASE_URL?: string
}

const envVars: Env = {
  DATABASE_URL: process.env.DATABASE_URL,
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: envVars.DATABASE_URL || 'file:./dev.db',
  },
})
