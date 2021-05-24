import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Movie {
    title: String
    year: Int
  }

  type Query {
    movies: [Movie]
    movie: Movie
  }

  type Mutation {
    createMovie(title: String, year: Int): Boolean
    deleteMovie(title: String): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ title: 'hello', year: 2021 }),
  },
  Mutation: {
    createMovie: (_, { title, year }) => {
      console.log(title, year);
      return true;
    },
    deleteMovie: (_, { title }) => {
      console.log(title);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log('Server is running on localhost:4000 🚀'));
