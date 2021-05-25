import { ApolloServer, gql } from 'apollo-server';
import schema from './schema';

const server = new ApolloServer({
  schema,
});

server
  .listen()
  .then(() => console.log('Server is running on localhost:4000 🚀'));
