import client from '../../client';
import bcrypt from 'bcrypt';
import { protectedResolver } from '../users.utils';

const resolverFn = async (
  _,
  {
    username,
    email,
    password: newPassword,
    name,
    location,
    avatarURL,
    githubUsername,
  },
  { loggedInUser }
) => {
  try {
    let hashedPassword = null;
    if (newPassword) {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        username,
        email,
        name,
        location,
        avatarURL,
        githubUsername,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    return updatedUser.id
      ? { ok: true, id: updatedUser.id }
      : { ok: false, error: "Couldn't update user's profile." };
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
