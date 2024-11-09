export const mojeReportTemplate = (data: any) => {
  return `
        <!DOCTYPE html>
            <html>
            <head>
            <meta charset="utf-8" />
            <title>Ejemplo de Página</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" />
            <style>
                body {
                font-family: 'Archivo', sans-serif;
                font-size: 28px;
                width: 70.1vw;
                display: flex;
                flex-direction: column;
                align-items: center;
                }
                p {
                margin: 6px;
                }
                #user-head {
                width: 100%;
                display: flex;
                justify-content: space-between;
                border-bottom: 2px solid black;
                padding-bottom: 6px;
                }
                #waiter {
                width: 100%;
                font-weight: 900;
                }
                #total-tip {
                border-bottom: 1px solid black;
                }
                #signature {
                padding-top: 6px;
                border-top: 2px solid black;
                width: 75%;
                text-align: center;
                }
                #separate {
                border-bottom: 2px solid black;
                width: 100%;
                margin-top: 32px;
                }
                #left {
                width: 100%;
                margin-bottom: 6px;
                }
                #left > span {
                border-bottom: 1px solid black;
                }
                #right {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                }
                #between {
                width: 100%;
                display: flex;
                justify-content: space-between;
                }
                #center{
                  display:flex;
                  width: 100%;
                  justify-content: center;
        
                }
            </style>
            </head>
            <body>
            <p>TOMATE TAQUERIA SA DE CV</p>
            <p style="font-weight: 900;">CALCULO DE MOJE</p>
            <p>Ventas del día: ######</p>
            <div id="user-head">
                <span>Usuario ######</span>
                <span>Usuario ######</span>
            </div>
            <br />
            <p id="waiter">Mesero: ######</p>
            <br />
            <div id="between">
                <span style="border-bottom: 1px solid black;">Venta ($)</span>
                <span style="border-bottom: 1px solid black;">Moje ($)</span>
            </div>
            
            
            <div id="between">
                <span style="margin-top: 16px;">$0.00</span>
                <span style="margin-top: 16px;">${data.moje}</span>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div id="center">
              <span style="border-top: 2px solid black; padding: 8px" >Firma del mesero</span>
            </div>
            <span id="separate"></span>
            </body>
            </html>

    `;
};
