interface Props {
  name: string;
  email: string;
  password: string;
}

export const emailTemplate = (data: Props) => {
  return `
        <!DOCTYPE html>
                <html>
                <head>
                <style>
                    .container {
                    background: #000;
                    font-family: Arial, sans-serif;
                    padding: 16px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    width: 600px;
                    margin: 0 auto;
                    color: #ffffffa7;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    }
                    .header {
                    background: linear-gradient(180deg, rgba(249, 249, 249, 0.15) 0%, rgba(249, 249, 249, 0.03) 100%);
                    padding: 8px 32px;
                    border-radius: 8px;
                    }
                    .content {
                    background: linear-gradient(180deg, rgba(249, 249, 249, 0.15) 0%, rgba(249, 249, 249, 0.03) 100%);
                    border-radius: 8px;
                    padding: 20px;
                    }
                    .footer {
                    text-align: center;
                    padding: 10px;
                    border-top: 1px solid #ddd;
                    }
                </style>
                </head>
                <body>
                <div class="container">
                    <div class="header">
                    <h1>Bienvenido a TomateSoft</h1>
                    </div>
                    <div class="content">
                    <p>Gracias por registrarte con nosotros, ${data.name}.</p>
                    Podras continuar con tu proceso de registro usando las siguientes credenciales:
                        <br>
                        <br>
                    <ul>
                        <li>email: example.gmail.com</li>
                        <br>
                        <li>password: sJHIAhdsh4DhgD5d</li>
                    </ul>
                    <p>Estamos emocionados de tenerte a bordo. Si tienes alguna pregunta, no dudes en contactarnos.</p>
                    </div>
                    <div class="footer">
                    <p>&copy; 2024 TomateSoft. Todos los derechos reservados.</p>
                    </div>
                </div>
                </body>
                </html>
    `;
};
