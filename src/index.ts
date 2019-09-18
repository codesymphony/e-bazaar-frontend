import * as express from 'express'
import * as bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

app.get('/', (request: express.Request, response: express.Response) => {
  response.status(200).send('root route working')
})

app.listen(5000, () => {
  console.log('server started on port 5000')
})
