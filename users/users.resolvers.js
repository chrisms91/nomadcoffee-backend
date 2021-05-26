import client from '../client';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    createAccount: async (
      _,
      { email, password, username, name, location, avatarURL, githubUsername }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });

        if (existingUser) {
          return { ok: false, error: 'This username/email is already taken.' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const unix = Math.floor(new Date().getTime() / 1000);

        const newUser = await client.user.create({
          data: {
            email,
            password: hashedPassword,
            username,
            name,
            location,
            avatarURL:
              avatarURL ??
              `https://www.gravatar.com/avatar/${unix}?d=identicon`,
            githubUsername,
          },
        });

        return { id: newUser.id, ok: true };
      } catch (error) {
        console.log(error);
        return { ok: false, error };
      }
    },
  },
};
