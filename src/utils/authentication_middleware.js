import verifyToken from './verify_token'

export default async function authenticationMiddleware(
  req,
  res,
  next,
  authConfig
) {
  // Check if the request contains a valid JWT token
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({
      success: false,
      code: 401,
      error: {
        type: 'UNAUTHORIZED',
        description: 'Unauthorized: Missing authentication token'
      }
    })
  }

  const { user, error } = await verifyToken(token)

  if (error) return res.status(401).json(error)

  // Check if the user has one of the required roles
  if (!authConfig.roles.includes(user.role)) {
    return res.status(403).json({
      success: false,
      code: 403,
      error: {
        type: 'FORBIDDEN',
        description: 'Forbidden: User does not have the required role'
      }
    })
  }

  // Send user to request headers for microservices
  req.headers.user = JSON.stringify(user)

  return next()
}
