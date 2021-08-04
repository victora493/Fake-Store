export const perPageOptions = [
    {
        displayName: 3,
        value: 3,
    },
    {
        displayName: 6,
        value: 6,
    },
    {
        displayName: 8,
        value: 8,
    },
    {
        displayName: 10,
        value: 10,
    },
    {
        displayName: 12,
        value: 12,
    },
]

export const sortOptions = [
    {
        displayName: 'Title',
        value: "title-asc",
    },
    {
        displayName: 'Price: Ascending',
        value: 'price-asc',
    },
    {
        displayName: 'Price: Descending',
        value: 'price-desc',
    },
]

export const sortProducts = (products, ascending = true, target = 'title') => {
    return products.sort((productA, productB) => {
      if (ascending) {
        return productA[target] > productB[target] ? 1 : -1;
      } else {
        return productA[target] < productB[target] ? 1 : -1;
      }
    });
};