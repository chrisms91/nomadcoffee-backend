// code from https://gist.github.com/codeguy/6684588
export const slugify = (text) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

export const processCategories = (categories) =>
  categories.map((category) => ({
    where: { name: category },
    create: {
      name: category,
      slug: slugify(category),
    },
  }));
