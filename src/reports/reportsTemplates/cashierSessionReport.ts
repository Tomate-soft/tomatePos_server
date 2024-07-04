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

  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Ejemplo de Página</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap"
    />
   
  </head>
  <style>
  p{
    margin: 6px
  }
  #user-head{
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid black;
    padding-bottom: 6px
    
  }
  #waiter{
    width: 100%;
    font-weight: 900;
  }
  #total-tip{
    border-bottom: 1px solid black;
  }
  #signature{
    padding-top: 6px;
    border-top: 2px solid black;
    width:75%;
    text-align:center;
  }
  
  #separate{
    border-bottom: 2px solid black;
    width: 100%;
    margin-top: 32px;
  }
  
  #left{
    width: 100%;
    margin-bottom: 6px;
    >span{
    border-bottom: 1px solid black;
      
    }
  }
  
  #right{
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  
  #between{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  </style>
  <body>
    <div  style="width: 70.1vw; font-family: Archivo; font-size: 28px; display: flex; flex-direction: column; align-items: center; ">
      <p >TOMATE TAQUERIA SA DE CV</p>
      <p style="font-weight: 900">
      CIERRE DE CAJA
      </p>
      <p >Ventas del día: ######</p>
      <div id="user-head">
        <span>Usuario ###### </span> 
        <span>Usuario ###### </span> 
      </div>
      <p id="waiter">
      Folio: 00000
      </p>
       <p id="waiter">
      Caja: 00
      </p>
      <p id="waiter">
      Mesero: ######
      </p>
      <p id="waiter">
      Apertura: 00:00:00
      </p>
      <p id="waiter">
      Cierre: 00:00:00
      </p>
      <br>
      <div id="left">
        <span >Conteo de caja</span>
      </div>
      <div id="between">
        <span>Apertura de caja</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Efectivo</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Retiros parciales</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Tarjeta de débito</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Tarjeta de crédito</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Transferecia</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Rappi</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Uber Eats</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Diddi Food</span>
        <span>0.00</span>
      </div>
      <br>
      <div id="right" style="font-weight: 600">
        <span>Total: 0.00</span>
      </div>
      <br>
      
     
      
      
       <div id="left">
        <span >Declarado</span>
      </div>
      <div id="between">
        <span>Apertura de caja</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Efectivo</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Retiros parciales</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Tarjeta de débito</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Tarjeta de crédito</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Transferecia</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Rappi</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Uber Eats</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Diddi Food</span>
        <span>0.00</span>
      </div>
      <br>
      <div id="right" style="font-weight: 600">
        <span>Total: 0.00</span>
      </div>
      <br>
     
       <div id="left">
        <span >Resumen</span>
      </div>
      <div id="between">
        <span>Apertura de caja</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Efectivo</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Retiros parciales</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Tarjeta de débito</span>
        <span>0.00</span>
      </div>
      <div id="between">
        <span>Tarjeta de crédito</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Transferecia</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Rappi</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Uber Eats</span>
        <span>0.00</span>
      </div>
       <div id="between">
        <span>Diddi Food</span>
        <span>0.00</span>
      </div>
      <br>
       <div id="between">
        <span  style="font-weight: 600">Diferencia</span>
        <span  style="font-weight: 600">0.00</span>
      </div>
       <div id="between">
        <span  style="font-weight: 600; font-size: 32px">Diferencia efectivo</span>
        <span  style="font-weight: 600; font-size: 32px">0.00</span>
      </div>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
       <div id="between">
        <span  style="padding-top: 6px; border-top: 2px solid black;">Firma del supervisor</span>
        <span  style="padding-top: 6px; border-top: 2px solid black;">Firma del cajero</span>
      </div>
      <span id="separate"></span>
      <br>
    </div>
  </body>
</html>


  
    `;
};
