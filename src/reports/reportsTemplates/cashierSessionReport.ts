export const cashierSessionReport = (data: any) => {
  console.log(data);
  /////////////////////////////////////////
  /*      Informacion de caja           */
  /////////////////////////////////////////
  const BILL_CASH = data.cash;
  const INITIAL_CASH = data.session.initialQuantity;
  const BILL_DEBIT = data.debit;
  const BILL_CREDIT = data.credit;
  const BILL_TRANSFER = data.transference;
  const BILL_RAPPI = data.rappi;
  const BILL_DIDI = data.didiFood;
  const BILL_UBER = data.uberEats;

  /////////////////////////////////////////
  /*      Informacion de la venta         */
  /////////////////////////////////////////
  const REQUEST_CASH = data.totalCash.length > 0 ? data.totalCash : '$0.00';

  // Genera un HTML simple a partir del JSON
  return `
      <html>
        <body>
          <div style="width: 70.1vw; font-family: sans-serif; font-size: 32px; display: flex; flex-direction: column; align-items: center;">
            <h1>Cierre de caja</h1>
            <h3 style="border: 2px dashed #000; width: 100%; text-align: center; padding: 6px;">Caja</h3>
            <div style="gap: 8px; display: flex; width: 100%; margin-bottom: 32px;">
              <div style="padding: 8px; width: 100%; display: flex; flex-direction: column; gap: 16px;">
                <strong>Concepto</strong>
                <span style="font-size: 24px;">Efectivo Inicial</span>
                <span style="font-size: 24px;">Efectivo venta</span>
                <span style="font-size: 24px;">Debito</span>
                <span style="font-size: 24px;">Credito</span>
                <span style="font-size: 24px;">Transferencia</span>
                <span style="font-size: 24px;">Rappi</span>
                <span style="font-size: 24px;">Didi Food</span>
                <span style="font-size: 24px;">Uber Eats</span>
                <span style="font-size: 24px;">Total</span>
              </div>
              <div style="padding: 8px; width: 100%; display: flex; flex-direction: column; gap: 16px;">
                <strong>Ingresado</strong>
                <span style="font-size: 24px;">$${INITIAL_CASH}</span>
                <span style="font-size: 24px;">$${BILL_CASH}</span>
                <span style="font-size: 24px;">$${BILL_DEBIT}</span>
                <span style="font-size: 24px;">$${BILL_CREDIT}</span>
                <span style="font-size: 24px;">$${BILL_TRANSFER}</span>
                <span style="font-size: 24px;">$${BILL_RAPPI}</span>
                <span style="font-size: 24px;">$${BILL_DIDI}</span>
                <span style="font-size: 24px;">$${BILL_UBER}</span>
                <span style="font-size: 24px;">#$0.00</span>
              </div>
            </div>
            <h3 style="border: 2px dashed #000; width: 100%; text-align: center; padding: 6px;">Venta</h3>
            <div style="gap: 8px; display: flex; width: 100%; margin-bottom: 32px;">
              <div style="padding: 8px; width: 100%; display: flex; flex-direction: column; gap: 16px;">
                <strong>Concepto</strong>
                <span style="font-size: 24px;">Efectivo ventas</span>
                <span style="font-size: 24px;">Debito</span>
                <span style="font-size: 24px;">Credito</span>
                <span style="font-size: 24px;">Transferencia</span>
                <span style="font-size: 24px;">Total</span>
              </div>
              <div style="padding: 8px; width: 100%; display: flex; flex-direction: column; gap: 16px;">
                <strong>Venta</strong>
                <span style="font-size: 24px;">$${REQUEST_CASH}</span>
                <span style="font-size: 24px;">#$0.00</span>
                <span style="font-size: 24px;">#$0.00</span>
                <span style="font-size: 24px;">#$0.00</span>
              </div>
            </div>
            <div style="margin-top: 180px; width: 420px; border-top: 2px solid #000; text-align: center;">
              <h3 style="border: none;">Firma del cajero</h3>
            </div>
          </div>

        </body>
      </html>
    `;
};
