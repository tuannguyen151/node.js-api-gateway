export const ROLES = {
  ADMIN: 1,
  USER: 2
}

export const VERIFY_TOKEN_API = `${process.env.USERS_MICROSERVICE_DOMAIN}/api/v1/users/auth/verify-token`
