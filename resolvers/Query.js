export const Query = {
  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;
    if (filter) {
      if (filter.onSale === true) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
      if ([1, 2, 3, 4, 5].includes(filter.averageRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numOfReviews = 0;
          reviews.forEach((review) => {
            if (db.review.productId === product.id) {
              sumRating += review.rating;
              numOfReviews++;
            }
          });
          const avgProductRating = sumRating / numOfReviews;
          return avgProductRating >= filter.averageRating;
        });
      }
    }
    return filteredProducts;
  },

  product: (parent, args, { db }) => {
    return db.products.find((product) => product.id === args.id);
  },

  categories: (parent, args, { db }) => {
    return db.categories;
  },

  category: (parent, args, { db }) => {
    return db.categories.find((category) => category.id === args.id);
  },
};
