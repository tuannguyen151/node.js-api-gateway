import { rateLimit } from 'express-rate-limit'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'
import { pathToRegexp } from 'path-to-regexp'

import MICROSERVICES from './microservices'
import authenticationMiddleware from './utils/authentication_middleware'
import createCorsOptions from './utils/create_cors_options'

// Function to create a proxy middleware for each microservice route
function createMicroserviceProxyMiddleware(app, route, apiPrefix) {
  const { name, auth, rateLimit: rateLimitPassedOptions, proxy } = route
  const corsOptions = createCorsOptions(proxy.target)

  const middlewares = [cors(corsOptions)]

  // Add authentication middleware if required
  if (auth)
    middlewares.push((req, res, next) => {
      // Find the matching auth configuration for the request path and method
      const authConfig = auth.find(
        (item) =>
          pathToRegexp(item.path).exec(req.path) &&
          item.methods.includes(req.method)
      )

      // If there is no matching auth configuration, move to the next middleware (no authentication required)
      if (!authConfig) return next()

      return authenticationMiddleware(req, res, next, authConfig)
    })

  // Add rate limiting middleware if required
  if (rateLimitPassedOptions)
    middlewares.push(rateLimit(rateLimitPassedOptions))

  const proxyMiddleware = createProxyMiddleware(proxy)

  // Mount the proxy middleware to the corresponding URL with optional middlewares
  app.use(apiPrefix + name, ...middlewares, proxyMiddleware)
}

// Function to create microservice proxies for all routes
export default function createMicroserviceProxies(app, apiPrefix = '/api/v1/') {
  MICROSERVICES.forEach((route) => {
    createMicroserviceProxyMiddleware(app, route, apiPrefix)
  })
}
