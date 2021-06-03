import { gql } from 'apollo-server';

export default gql`
  type CreateCoffeeShopResult {
    ok: Boolean!
    error: String
    shop: CoffeeShop
  }
  type Mutation {
    createCoffeeShop(
      url: String!
      categories: [String]
      name: String!
      latitude: String!
      longitude: String!
    ): CreateCoffeeShopResult!
  }
`;
