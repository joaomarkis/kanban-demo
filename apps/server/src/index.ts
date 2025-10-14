import express from 'express'
import { getMessage } from '@shared/utils'
import { AppDataSource } from './db/data-source'

const app = express()

async function runServer() {
  try {
    await AppDataSource.initialize()
    console.log("database connection succesfully")

    app.get('/', (_req, res) => {
      res.send(getMessage())
    })

    app.listen(3000, () => {
      console.log('🚀 Server running at http://localhost:3000')
    })
  } catch(err) {
    console.error("error:", err)
  }
}

runServer()


