import { spawn } from 'child_process';
import { join } from 'path';

// Definir la ruta del archivo .exe
const exePath = join(__dirname, '..', 'bin', 'calculo.exe');

// Ejecutar el .exe con spawn
const process = spawn(exePath, ['argumento1', 'argumento2']); // Puedes pasar argumentos si es necesario

// Manejar la salida del proceso
process.stdout.on('data', (data) => {
  console.log(`Salida del ejecutable: ${data}`);
});

// Manejar los errores
process.stderr.on('data', (data) => {
  console.error(`Error del ejecutable: ${data}`);
});

// Manejar cuando el proceso termine
process.on('close', (code) => {
  console.log(`El proceso terminó con el código ${code}`);
});
