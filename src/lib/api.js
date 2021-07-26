const API_URL = 'https://fakestoreapi.com'

export async function getAllProducts() {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch products.');
  }

  const productsArr = [...data];

  return productsArr;
}

export async function getSingleProduct(productId) {
  const response = await fetch(`${API_URL}/products/${productId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch product.');
  }

  const productsArr = [...data];

  return productsArr;
}
