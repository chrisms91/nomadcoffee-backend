import client from '../client';
import { GraphQLUpload } from 'graphql-upload';
import { SMALL_PAGE_SIZE } from '../shared/constants';

export default {
  Upload: GraphQLUpload,
  CoffeeShop: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    categories: ({ id }, { lastId }) =>
      client.coffeeShop
        .findUnique({
          where: {
            id,
          },
        })
        .categories({
          take: SMALL_PAGE_SIZE,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
    photos: ({ id }, { lastId }) =>
      client.coffeeShop
        .findUnique({
          where: {
            id,
          },
        })
        .photos({
          take: SMALL_PAGE_SIZE,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
  Category: {
    totalShops: ({ id }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
    shops: ({ id }, { lastId }) =>
      client.category
        .findUnique({
          where: {
            id,
          },
        })
        .shops({
          take: SMALL_PAGE_SIZE,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
};
