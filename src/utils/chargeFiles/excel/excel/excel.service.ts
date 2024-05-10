import { Injectable } from '@nestjs/common';
import * as xlsx from "xlsx";

@Injectable()
export class ExcelService {

    async processExcel(file: any) {
        try {
            if (!file) {
                throw new Error('No se proporcionó ningún archivo.');
            }
        
            const workbook = xlsx.read(file.buffer, { type: 'buffer' });
            const sheetNames = workbook.SheetNames;
        
            if (sheetNames.length === 0) {
                throw new Error('El archivo Excel no contiene ninguna hoja de trabajo.');
            }
        
            const sheetName = sheetNames[0]; // Accede a la primera hoja
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet);
            return data;
            
        } catch (error) {
            console.error('Error al procesar el archivo Excel:', error);
            throw new Error('Error al procesar el archivo Excel');
        }
      
    }
    //relevantando server inicio de turno
}

