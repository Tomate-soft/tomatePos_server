const fs = require('fs');
const path = require('path');

// Rutas de origen y destino
const sourceDir = path.join(__dirname, '..', 'bin');  // Carpeta bin
const destDir = path.join(__dirname, '..', 'dist', 'bin');  // Carpeta dist/bin

// Función para copiar archivos
function copyFiles(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  files.forEach(file => {
    const sourceFile = path.join(source, file);
    const destFile = path.join(destination, file);
    
    fs.copyFileSync(sourceFile, destFile); // Copia el archivo
  });
}

// Llamar a la función para copiar los archivos
copyFiles(sourceDir, destDir);
console.log('Archivos de la carpeta bin copiados a dist/bin');
