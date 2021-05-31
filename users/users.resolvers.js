import client from '../client';
import { FOLLOW_PAGE_SIZE } from '../shared/constants';

export default {
  User: {
    following: async ({ id }, { page }, { loggedInUser }) => {
      const followingList = await client.user
        .findUnique({ where: { id } })
        .following({
          take: FOLLOW_PAGE_SIZE,
          skip: (page - 1) * FOLLOW_PAGE_SIZE,
        });
      return followingList;
    },
    followers: async ({ id }, { page }, { loggedInUser }) => {
      const followersList = await client.user
        .findUnique({ where: { id } })
        .followers({
          take: FOLLOW_PAGE_SIZE,
          skip: (page - 1) * FOLLOW_PAGE_SIZE,
        });
      return followersList;
    },
  },
};
