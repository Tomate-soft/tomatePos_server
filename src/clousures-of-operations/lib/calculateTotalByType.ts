export const calculateTotalByType = (transactionArray, type) => {

  return transactionArray
    .filter((payment) => payment.paymentType === type)
    .reduce(
      (acc, curr) =>
        acc + (curr.payQuantity ? parseFloat(curr.payQuantity) : 0),
      0,
    );
};
