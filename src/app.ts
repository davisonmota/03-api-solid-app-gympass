import fastify from 'fastify'
import { appRoutes } from './http/controllers/routes'

const app = fastify()

app.register(appRoutes)

export { app }
