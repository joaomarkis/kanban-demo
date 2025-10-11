import express from 'express'
import { getMessage } from '@shared/utils'

const app = express()

app.get('/', (_req, res) => {
  res.send(getMessage())
})

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000')
})
