import client from '../../client';
import { protectedResolver } from '../users.utils';

const resolverFn = async (_, { username }, { loggedInUser }) => {
  try {
    const targetUser = await client.user.findUnique({ where: { username } });
    if (!targetUser) return { ok: false, error: "The user doesn't exist." };

    await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        following: {
          disconnect: {
            username,
          },
        },
      },
    });

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, error: 'Failed to unfollow user.' };
  }
};

export default {
  Mutation: {
    unfollowUser: protectedResolver(resolverFn),
  },
};
