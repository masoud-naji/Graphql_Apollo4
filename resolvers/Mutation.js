import { v4 } from "uuid";

export const Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const newCategory = {
      id: v4(),
      name: input.name,
    };
    db.categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, { input }, { db }) => {
    const { name, description, image, quantity, price, onSale, categoryId } =
      input;
    const newProduct = {
      id: v4(),
      name,
      description,
      image,
      quantity,
      price,
      onSale,
      categoryId,
    };
    db.products.push(newProduct);
    return newProduct;
  },
  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productId } = input;
    const neReview = {
      id: v4(),
      date,
      title,
      comment,
      rating,
      productId,
    };
    db.reviews.push(neReview);
    return neReview;
  },
  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryId === id)
        return {
          ...product,
          categoryId: null,
        };
      else return product;
    });
    return true;
  },

  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter((product) => product.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);
    return true;
  },

  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);
    return true;
  },

  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);
    if (index === -1) return null;
    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };
    console.log(db.categories[index]);
    return db.categories[index];
  },

  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((product) => product.id === id);
    if (index === -1) return null;
    db.products[index] = {
      ...db.products[index],
      ...input,
    };
    return db.products[index];
  },
  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id);
    db.reviews[index] = {
      ...db.reviews[index],
      ...input,
    };
    return db.reviews[index];
  },
};
