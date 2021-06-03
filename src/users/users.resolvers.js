import client from '../client';
import { SMALL_PAGE_SIZE } from '../shared/constants';

export default {
  User: {
    following: async ({ id }, { page }, { loggedInUser }) => {
      const followingList = await client.user
        .findUnique({ where: { id } })
        .following({
          take: SMALL_PAGE_SIZE,
          skip: (page - 1) * SMALL_PAGE_SIZE,
        });
      return followingList;
    },
    followers: async ({ id }, { page }, { loggedInUser }) => {
      const followersList = await client.user
        .findUnique({ where: { id } })
        .followers({
          take: SMALL_PAGE_SIZE,
          skip: (page - 1) * SMALL_PAGE_SIZE,
        });
      return followersList;
    },
  },
};
