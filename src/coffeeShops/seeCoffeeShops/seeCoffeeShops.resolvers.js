import client from '../../client';
import { LARGE_PAGE_SIZE } from '../../shared/constants';

export default {
  Query: {
    seeCoffeeShops: (_, { lastId }) =>
      client.coffeeShop.findMany({
        take: LARGE_PAGE_SIZE,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
