import client from '../../client';
import { uploadToS3 } from '../../shared/shared.utils';
import { protectedResolver } from '../../users/users.utils';
import { processCategories } from '../coffeeShops.utills';

const resolverFn = async (
  _,
  { id, name, latitude, longitude, file, categories },
  { loggedInUser }
) => {
  try {
    // find the shop to be modified
    const targetShop = await client.coffeeShop.findFirst({
      where: {
        id,
        userId: loggedInUser.id,
      },
      include: {
        categories: {
          select: {
            id: true,
          },
        },
      },
    });
    console.log(targetShop);
    if (!targetShop) return { ok: false, error: 'CoffeeShop is not found.' };

    // update
    await client.coffeeShop.update({
      where: {
        id,
      },
      data: {
        name,
        latitude,
        longitude,
        ...(categories && {
          categories: {
            disconnect: targetShop.categories,
            connectOrCreate: processCategories(categories),
          },
        }),
      },
    });

    // add photo
    if (file) {
      const fileUrl = await uploadToS3(file, loggedInUser.id, 'uploads');
      console.log(fileUrl);
      await client.coffeeShopPhoto.create({
        data: {
          url: fileUrl,
          shop: {
            connect: {
              id,
            },
          },
        },
      });
    }

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, error };
  }
};

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(resolverFn),
  },
};
