import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { processCategories, slugify } from '../coffeeShops.utills';

const resolverFn = async (
  _,
  { url, categories, name, latitude, longitude },
  { loggedInUser }
) => {
  try {
    // process multiple categories and slugify category name
    let categoryObjs = [];
    categoryObjs = processCategories(categories);

    // create new coffeeshop
    const newCoffeeShop = await client.coffeeShop.create({
      data: {
        name,
        latitude,
        longitude,
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
        ...(categoryObjs.length > 0 && {
          categories: {
            connectOrCreate: categoryObjs,
          },
        }),
      },
    });

    // create new photo
    const newCoffeeShopPhoto = await client.coffeeShopPhoto.create({
      data: {
        url,
        shop: {
          connect: {
            id: newCoffeeShop.id,
          },
        },
      },
    });

    return { ok: true, shop: newCoffeeShop };
  } catch (error) {
    console.log(error);
    return { ok: false, error: 'Unable to create new coffeeshop' };
  }
};

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(resolverFn),
  },
};
