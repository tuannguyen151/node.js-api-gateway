export default function createCorsOptions(target) {
  return {
    origin(origin, callback) {
      if (
        target === origin ||
        (process.env.NODE_ENV !== 'production' && !origin)
      ) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
}
