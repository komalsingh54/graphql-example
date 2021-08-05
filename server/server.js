const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');


async function startApolloServer() {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf-8' }));

  // Provide resolver functions for your schema fields
  const resolvers = require('./resolver');


  const server = new ApolloServer({ typeDefs, resolvers,  context: ({ req }) => ({
    user: req.user
  }) });
  await server.start();

  const app = express();
  app.use(cors(), express.json(), expressJwt({
    secret: jwtSecret,
    credentialsRequired: false, algorithms: ['HS256']
  }));
  
  server.applyMiddleware({ app, path: '/graphql' });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.users.list().find((user) => user.email === email);
    if (!(user && user.password === password)) {
      res.sendStatus(401);
      return;
    }
    const token = jwt.sign({ sub: user.id }, jwtSecret);
    res.send({ token });
  });

  return { server, app };
}

startApolloServer()