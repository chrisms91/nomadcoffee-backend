import client from '../../client';
import { SEARCH_PAGE_SIZE } from '../../shared/constants';

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
        take: SEARCH_PAGE_SIZE,
        skip: (page - 1) * SEARCH_PAGE_SIZE,
      });

      return users;
    },
  },
};
