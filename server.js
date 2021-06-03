require('dotenv').config();
import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { typeDefs, resolvers } from './schema';
import { getUser } from './users/users.utils';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  uploads: false,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const PORT = process.env.PORT;

const app = express();
app.use(graphqlUploadExpress());
app.use(logger('tiny'));
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} 🚀`);
});
