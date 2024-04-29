export const getFavoriteProductIds = () => {
  const FavoriteProductIds = localStorage.getItem('favorite_products')
    ? JSON.parse(localStorage.getItem('favorite_products'))
    : [];

  return favoriteProductIds;
};

export const saveProductIds = (productIdArr) => {
  if (productIdArr.length) {
    localStorage.setItem('favorite_products', JSON.stringify(productIdArr));
  } else {
    localStorage.removeItem('favorite_products');
  }
};

export const removeProductId = (productId) => {
  const favoriteProductIds = localStorage.getItem('favorite_products')
    ? JSON.parse(localStorage.getItem('favorite_products'))
    : null;

  if (!favoriteProductIds) {
    return false;
  }

  const updatedFavoriteProductIdsIds = favoriteProductIdsIds?.filter((favoriteProductIdsId) => favoriteProductIdsId !== productId);
  localStorage.setItem('favorite_products', JSON.stringify(updatedFavoriteProductIds));

  return true;
};
