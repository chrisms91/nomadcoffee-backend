import { gql } from 'apollo-server';

export default gql`
  type Query {
    seeCategory(id: Int!, lastId: Int): [CoffeeShop]
  }
`;
