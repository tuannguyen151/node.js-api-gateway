import { ROLES } from '../config'

// Example URL: $USERS_MICROSERVICE_DOMAIN/api/v1/users/$PATH
const USERS_MICROSERVICE = {
  name: 'users',

  auth: [
    {
      path: '/profile',
      methods: ['GET'],
      roles: [ROLES.ADMIN, ROLES.USER]
    }
  ],

  // Rate limit options: https://github.com/express-rate-limit/express-rate-limit#configuration
  // rateLimit: {
  //   windowMs: 15 * 60 * 1000,
  //   max: 5
  // },

  // Proxy options: https://www.npmjs.com/package/http-proxy-middleware#http-proxy-middleware-options
  proxy: {
    target: process.env.USERS_MICROSERVICE_DOMAIN,
    changeOrigin: true
  }
}

export default USERS_MICROSERVICE
