import { app } from './app'
import { env } from './env'
import { prisma } from './lib/prisma'

async function main (): Promise<void> {
  await prisma.$connect()
}

main().then(async () => {
  app
    .listen({
      host: '0.0.0.0',
      port: env.PORT
    })
    .then(() => {
      console.log('Server running')
    })
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
