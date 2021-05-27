import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../../client';

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        // find user and check password
        const user = await client.user.findFirst({ where: { username } });
        if (!user) {
          return { ok: false, error: 'User not found.' };
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
          return { ok: false, error: 'Incorrect password.' };
        }

        // issue a token and send it to the server
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return { ok: true, token };
      } catch (error) {
        console.log(error);
        return { ok: false, error };
      }
    },
  },
};
