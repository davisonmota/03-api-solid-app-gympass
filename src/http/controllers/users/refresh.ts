import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function refresh (
  request: FastifyRequest,
  replay: FastifyReply
): Promise<FastifyReply> {
  try {
    await request.jwtVerify({ onlyCookie: true }) // verifica o Token que está no cookie

    const { role } = request.user

    const accessToken = await replay.jwtSign({
      role
    }, {
      sign: {
        sub: request.user.sub
      }
    })

    const refreshToken = await replay.jwtSign({
      role
    }, {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d'
      }
    })

    return replay
      .setCookie('refreshToken', refreshToken, {
        path: '/', // quais rotas tem acesso à esse cookie
        secure: true,
        sameSite: true,
        httpOnly: true
      })
      .status(200)
      .send({ token: accessToken })
  } catch (error) {
    return replay.status(401).send({ message: 'Unauthorized' })
  }
}
