import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const machineIdentifier = () => {
  const nameDoc = 'idn.config.ts';

  // Verificar si el archivo ya existe
  if (fs.existsSync(nameDoc)) {
    // Si existe, leer y consoluear el contenido
    fs.readFile(nameDoc, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
      } else {
        console.log(`Contenido del archivo '${nameDoc}':`);
        console.log(data);
      }
    });
  } else {
    const contenido = uuidv4();
    const content = `export const idnMachine = "${contenido}"`;

    // Si no existe, crear el archivo
    fs.writeFile(nameDoc, content, 'utf-8', (err) => {
      if (err) {
        console.error('Error al escribir el archivo:', err);
      } else {
        console.log(`Archivo '${nameDoc}' creado exitosamente.`);

        // Leer y consoluear el contenido después de crearlo
        fs.readFile(nameDoc, 'utf-8', (err, data) => {
          if (err) {
            console.error('Error al leer el archivo:', err);
          } else {
            console.log(`Contenido del archivo '${nameDoc}':`);
            console.log(data);
          }
        });
      }
    });
  }
};
