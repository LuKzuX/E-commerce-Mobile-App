export const addMoreOfTheSameProductToCart = (user, id, productToBeAdded) => {
  for (let i = 0; i < user.cart.length; i++) {
    if (id == user.cart[i]._id.toString()) {
      user.cart[i].quantity += 1;
    } else {
      user.cart.push(productToBeAdded);
    }
  }
};

export const addSpecificProductQuantityToCart = (
  user,
  id,
  quantity,
  product
) => {
  let found = false;
  let x = 0;
  for (let i = 0; i < user.cart.length; i++) {
    if (id == user.cart[i]._id.toString()) {
      user.cart[i].quantity = quantity;
      found = true;
    } else {
      if (user.cart.length > 1) {
        x = user.cart.length - 1;
      }
    }
  }
  if (!found) {
    user.cart.push(product);
    user.cart[x].quantity = quantity;
  }
};
