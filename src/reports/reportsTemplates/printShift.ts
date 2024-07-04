export const printShiftTemplate = (data: any) => {
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
                <style>
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
                </style>
            </head>
            <body>
                <div
                style="
                    width: 70.1vw;
                    font-family: Archivo;
                    font-size: 28px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                "
                >
                <p>TOMATE TAQUERIA SA DE CV</p>
                <p style="font-weight: 900">REGISTRO DE TURNO</p>
                <p>Ventas del día: ######</p>
                <div id="user-head">
                    <span>Usuario ######</span>
                    <span>Usuario ######</span>
                </div>
                <div>
                    <br />
                    <span>00:00:00</span>
                </div>
                <span id="separate"></span>
                </div>
            </body>
            </html>



    `;
};
