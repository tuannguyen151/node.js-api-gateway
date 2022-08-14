import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import createMicroserviceProxies from './create_microservice_proxies'

const app = express()

app.use(morgan('common'))
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
