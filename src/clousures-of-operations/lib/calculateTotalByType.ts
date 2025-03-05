export const calculateTotalByType = (transactionArray, type) => {
  transactionArray.forEach((payment) => {
    if (payment.paymentType === 'transfer') {
      console.log(payment);
    }
  });
  return transactionArray
    .filter((payment) => payment.paymentType === type)
    .reduce(
      (acc, curr) =>
        acc + (curr.payQuantity ? parseFloat(curr.payQuantity) : 0),
      0,
    );
};
