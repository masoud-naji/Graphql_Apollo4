export const Category = {
  products: (parent, { filter }, { db }) => {
    const categoryProducts = db.products.filter(
      (product) => product.categoryId === parent.id
    );
    let filteredCategoryProducts = categoryProducts;
    const { onSale } = filter;

    if (filter) {
      if (onSale) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => product.onSale
        );
      }
      if (filter.averageRating) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => {
            let sumRating = 0;
            let numOfReviews = 0;
            reviews.forEach((review) => {
              if (review.productId === product.id) {
                sumRating += review.rating;
                numOfReviews++;
              }
            });
            const avgProductRating = sumRating / numOfReviews;
            return avgProductRating >= filter.averageRating;
          }
        );
      }
    }
    return filteredCategoryProducts;
  },
};
