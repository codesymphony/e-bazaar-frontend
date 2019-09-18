import * as express from 'express';
import * as bodyParser from 'body-parser';
import { GraphQLServer } from 'graphql-yoga';

// const app = express();

// app.use(bodyParser.json());

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.express.get('/', (request: express.Request, response: express.Response) => {
  response.status(200).send('root route working');
});

server.start({
  playground: '/graphql'
},
  () => console.log('Server is running on localhost:4000'))

// app.listen(5000, () => {
//   console.log('server started on port 5000');
// });
