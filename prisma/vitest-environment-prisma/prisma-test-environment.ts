import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import type { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDataBaseURL (schema: string): string {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup () {
    const schema = randomUUID()
    const databaseURL = generateDataBaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown () {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await prisma.$disconnect()
      }
    }
  }
}
