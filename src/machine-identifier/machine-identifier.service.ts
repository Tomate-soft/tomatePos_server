import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MachineIdentifierService {
  async generateAndSaveIdentifier() {
    const uniqueCode = 'codigoUnico';
    const fileContent = `Identificador de máquina: ${uniqueCode}`;
    const filePath = path.join(__dirname, '..', 'machineIdentifier.txt');

    // Utilizar Promesas para esperar la operación de escritura
    await new Promise<void>((resolve, reject) => {
      fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
          console.error('Error al crear el archivo:', err);
          reject(err);
        } else {
          console.log('Archivo creado exitosamente.');
          resolve(); // Resuelto sin valor, ya que no necesitamos un valor específico.
        }
      });
    });

    // Imprimir mensajes adicionales después de completar la operación de escritura
    console.log('FUNCIONA COMO PEDRADA!!!!');
    console.log('FUNCIONA COMO PEDRADA!!!!');
    console.log('FUNCIONA COMO PEDRADA!!!!');
  }
}
