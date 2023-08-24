import type { Config } from 'drizzle-kit'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
export default {
  driver: "mysql2",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config