import client from '../../client';
import { LARGE_PAGE_SIZE } from '../../shared/constants';

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      const users = await client.user.findMany({
        where: {
          username: {
            mode: 'insensitive',
            startsWith: keyword,
          },
        },
        take: LARGE_PAGE_SIZE,
        skip: (page - 1) * SEARCH_PAGE_SIZE,
      });

      return users;
    },
  },
};
