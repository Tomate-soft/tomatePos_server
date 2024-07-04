export const printPayTipsReport = (data: any) => {
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
  </style>
  <body>
    <div  style="width: 70.1vw; font-family: Archivo; font-size: 28px; display: flex; flex-direction: column; align-items: center; ">
      <p >TOMATE TAQUERIA SA DE CV</p>
      <p style="font-weight: 900">
      RETIRO DE PROPINA
      </p>
      <p >Ventas del día</p>
      <div id="user-head">
        <span>Usuario ###### </span> 
        <span>Usuario ###### </span> 
      </div>
      <p id="waiter">
      Mesero: ######
      </p>
      <p id="total-tip" >Propina total ($)</p>
      <p >2000</p>
      <p > Cantidad en texto / 100 M.N</p>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <span id="signature"> Firma del mesero</span>
    </div>
  </body>
</html>
        
        `;
};
