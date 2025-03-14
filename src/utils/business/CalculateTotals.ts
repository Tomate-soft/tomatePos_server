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

// import {
//   COURTESY_APPLY_BILL,
//   COURTESY_APPLY_NOTES,
// } from 'src/ventas/discounts/cases';
// import { SET_PERCENT, SET_QUANTITY } from './constants';

// interface Price {
//   name: string;
//   price: number;
// }

// interface Dish {
//   name: string;
//   prices: Price[];
// }

// interface Product {
//   quantity: number;
//   prices: Price[];
//   dishes?: Dish[];
// }

// // Calcula el total de un solo producto, incluyendo `dishes` si existen.
// export const calculateProductTotal = (
//   product: Product,
//   withDishes = false,
//   unitary = false,
// ): number => {
//   if (!product) return 0;
//   const { quantity, prices, dishes, discount } = product;

//   // Calcula el total del producto base (sin dishes).
//   const baseTotal = quantity * prices[0].price;
//   if (discount && discount.discountMount === '100') {
//     return 0;
//   }
//   console.log(baseTotal);

//   if (unitary) {
//     if (dishes && withDishes) {
//       const dishesTotal = dishes.reduce((sum, dish) => {
//         if (dish.prices.length > 0) {
//           return discount
//             ? sum +
//                 dish.prices[0].price -
//                 parseFloat(
//                   product?.discountedAmount ?? discount?.discountedAmount,
//                 )
//             : sum + dish.prices[0].price;
//         }
//         return discount
//           ? sum -
//               parseFloat(
//                 product?.discountedAmount ?? discount?.discountedAmount,
//               )
//           : sum;
//       }, 0);
//       // Suma el total del producto base con el total de los dishes.
//       return discount
//         ? prices[0].price +
//             dishesTotal -
//             parseFloat(product?.discountedAmount ?? discount?.discountedAmount)
//         : prices[0].price + dishesTotal;
//     }
//     return discount
//       ? prices[0].price -
//           parseFloat(product?.discountedAmount ?? discount?.discountedAmount)
//       : prices[0].price;
//   }

//   if (dishes && withDishes) {
//     // Calcula el total de los primeros precios de los dishes.
//     const dishesTotal = dishes.reduce((sum, dish) => {
//       if (dish.prices.length > 0) {
//         return sum + dish.prices[0].price * quantity;
//       }
//       return sum;
//     }, 0);

//     // Suma el total del producto base con el total de los dishes.
//     return discount?.discountedAmount
//       ? baseTotal -
//           parseFloat(product?.discountedAmount ?? discount?.discountedAmount) +
//           (dishesTotal -
//             parseFloat(calculateDishesDiscount(dishesTotal, discount)))
//       : baseTotal + dishesTotal;
//   }

//   return discount
//     ? baseTotal -
//         parseFloat(product?.discountedAmount ?? discount?.discountedAmount)
//     : baseTotal;
// };

// export const productTotalWithDiscount = (product: Product): number => {
//   if (!product?.discount) {
//     return calculateProductTotal(product);
//   }
//   // aca vamos con lña logica para hacer los descuentos
//   return 666;
// };

// // Calcula el total de una lista de productos.
// export const calculateBillTotal = (
//   products: Product[],
//   discount?: any,
// ): string => {
//   if (!products?.length) return '0.00s';

//   if (
//     discount?.discountType === COURTESY_APPLY_NOTES ||
//     discount?.discountType === COURTESY_APPLY_BILL
//   ) {
//     return '0.00';
//   }

//   // Suma el total de cada producto (incluyendo sus dishes) usando `calculateProductTotal`.
//   const total = products.reduce(
//     (sum, product) => sum + calculateProductTotal(product, true),
//     0,
//   );
//   products.forEach((element, index) => {
//     console.log(index);
//     console.log(calculateProductTotal(element, true));
//     console.log(element);
//   });

//   const areProductDiscount = products?.some((element) => element?.discount);

//   // logica por aca //
//   // para recalcular descuento //
//   // aca lo que hace falta es volver a recalcular un descuento

//   if (areProductDiscount) {
//     const newDiscountedAmount = calculateDiscount(
//       total,
//       parseFloat(discount?.discountMount),
//       discount?.setting,
//     );
//     return discount
//       ? (total - newDiscountedAmount).toFixed(2).toString()
//       : total.toFixed(2).toString();
//   }

//   return discount && discount !== null
//     ? (total - parseFloat(discount?.totalDiscountQuantity))
//         .toFixed(2)
//         .toString()
//     : total.toFixed(2).toString();
// };

// export const calculateDishesDiscount = (dishesAmount, discount) => {
//   if (!discount) return 0;
//   const { setting, discountMount } = discount;
//   if (setting === SET_PERCENT) {
//     return (dishesAmount * discountMount) / 100;
//   }
//   if (setting === SET_QUANTITY) {
//     return discountMount;
//   }
//   return 0;
// };
