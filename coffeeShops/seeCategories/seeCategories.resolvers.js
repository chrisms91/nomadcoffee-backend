import client from '../../client';
import { SMALL_PAGE_SIZE } from '../../shared/constants';

export default {
  Query: {
    seeCategories: (_, { lastId }) =>
      client.category.findMany({
        take: SMALL_PAGE_SIZE,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
