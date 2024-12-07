interface Price {
  name: string;
  price: number;
}

export interface Product {
  quantity: number;
  prices: Price[];
}

export const calculateProductTotal = (product: any) => {
  const { quantity, prices, dishes } = product;
  if (dishes) {
    const total = dishes.reduce((sum, dish) => {
      if (dish.prices.length > 0) {
        return sum + dish.prices[0].price; // Agrega el valor de la clave 'price' del primer objeto
      }
      return sum; // Si no hay precios, ignora este objeto
    }, 0);
    const totalProduct = quantity * prices[0].price;
    const totalProductWithDishes = (
      totalProduct.toFixed(2) + total.toFixed(2)
    ).toString();

    return totalProductWithDishes;
  }
  return (quantity * prices[0].price).toFixed(2).toString();
};

export const calculateBillTotal = (products: any) => {
  if (!products) {
    return '0.00';
  }
  return products
    .reduce((a, b) => a + b.quantity * b.prices[0].price, 0)
    .toFixed(2)
    .toString();
};
