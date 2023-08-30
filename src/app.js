import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import createMicroserviceProxies from './create_microservice_proxies'

const app = express()

const corsOptions = {
  origin(origin, callback) {
    if (
      process.env.CORS_WHITELIST.split(' ').indexOf(origin) !== -1 ||
      (process.env.NODE_ENV !== 'production' && !origin)
    ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(morgan('common'))
app.use(cors(corsOptions))
app.use(helmet())
app.use(compression())

createMicroserviceProxies(app)

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PATCH, DELETE'
  )

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
  )

  next()
})

export default app
