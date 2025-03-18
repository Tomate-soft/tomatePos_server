const fs = require('fs');
const path = require('path');

// Ruta de la carpeta bin en el proyecto
const sourceDir = path.join(__dirname, '..', 'bin');

// Ruta donde quieres copiar los archivos .exe
const destDir = path.join(__dirname, '..', 'dist', 'src', 'bin');

// Crear la carpeta de destino si no existe (incluyendo carpetas intermedias)
if (!fs.existsSync(destDir)) {
  console.log(`La carpeta ${destDir} no existe. Creándola...`);
  fs.mkdirSync(destDir, { recursive: true });
} else {
  console.log(`La carpeta ${destDir} ya existe.`);
}

// Copiar los archivos .exe desde bin a dist/src/bin
fs.readdirSync(sourceDir).forEach(file => {
  if (file.endsWith('.exe')) {
    const sourceFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);
    console.log(`Copiando archivo: ${sourceFile} a ${destFile}`);
    fs.copyFileSync(sourceFile, destFile);
  }
});

console.log('Postbuild finalizado');
