import client from '../../client';
import { SMALL_PAGE_SIZE } from '../../shared/constants';

export default {
  Query: {
    seeCategory: (_, { id, lastId }) =>
      client.category.findUnique({ where: { id } }).shops({
        take: SMALL_PAGE_SIZE,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
