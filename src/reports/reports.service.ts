import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import { join } from 'path';
import * as fs from 'fs/promises';
import { cashierSessionReport } from './reportsTemplates/cashierSessionReport';
import {
  CharacterSet,
  PrinterTypes,
  ThermalPrinter,
} from 'node-thermal-printer';
import { printPayTipsReport } from './reportsTemplates/tipsReport';
import { printShiftTemplate } from './reportsTemplates/printShift';
import { format, getISOWeek, startOfWeek } from 'date-fns';
import { mojeReportTemplate } from './reportsTemplates/mojeReport';
import { BillsService } from 'src/ventas/bills/bills.service';
import { FINISHED_STATUS } from 'src/libs/status.libs';
//import { ProcessService } from 'src/process/process.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
    private billService: BillsService,
    //private processService: ProcessService,
  ) {}

  private async ensureReportsFolderExists(folderPath: string) {
    try {
      await fs.access(folderPath); // Verifica si la carpeta existe
    } catch (error) {
      await fs.mkdir(folderPath, { recursive: true }); // Crea la carpeta si no existe
    }
  }

  private async getWeekFolderName() {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekNumber = getISOWeek(today);
    const formattedDate = format(weekStart, 'yyyy-MM-dd'); // Formato para nombre de carpeta
    return `Week-${weekNumber}_${formattedDate}`;
  }

  private async createPrinter() {
    return new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: `tcp://192.168.1.91`,
      characterSet: CharacterSet.SLOVENIA,
      removeSpecialCharacters: false,
      width: 42,
      options: {
        timeout: 100000,
      },
    });
  }

  async closeCashierSession(body: any) {
    try {
      const weekFolder = await this.getWeekFolderName();
      const folderPath = `C:/Reports/TillSession/${weekFolder}`;
      await this.ensureReportsFolderExists(folderPath);

      const html = cashierSessionReport(body);
      const reportName = `till_session-${new Date().getTime()}.png`;
      const savePath = `${folderPath}/${reportName}`;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      await page.screenshot({
        path: savePath,
        fullPage: true,
      });

      await browser.close();
      const printer = await this.createPrinter();
      printer.alignCenter();
      await printer.printImage(savePath);
      printer.alignLeft();
      await printer.printImage('./src/assets/icon/tomatelogoticket.png');
      printer.partialCut();
      await printer.execute();

      console.log('Ticket de sesión de caja impreso correctamente');
    } catch (error) {
      console.log('Error al imprimir el ticket de sesión de caja');
      console.log(error);
    }
  }

  async payTipsReport(body: any) {
    try {
      const weekFolder = await this.getWeekFolderName();
      const folderPath = `C:/Reports/tips/${weekFolder}`;
      await this.ensureReportsFolderExists(folderPath);

      const html = printPayTipsReport(body);
      const reportName = `tips_${new Date().getTime()}.png`;
      const savePath = `${folderPath}/${reportName}`;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      await page.screenshot({
        path: savePath,
        fullPage: true,
      });
      await browser.close();

      const printer = await this.createPrinter();
      printer.alignCenter();
      await printer.printImage(savePath);
      printer.alignLeft();
      await printer.printImage('./src/assets/icon/tomatelogoticket.png');
      printer.partialCut();
      await printer.execute();

      console.log('Ticket de reporte de tips impreso correctamente');
    } catch (error) {
      console.log('Error al imprimir el ticket de reporte de tips');
      console.log(error);
    }
  }

  async printShift(body: any) {
    try {
      const weekFolder = await this.getWeekFolderName();
      const folderPath = `C:/Reports/shifts/${weekFolder}`;
      await this.ensureReportsFolderExists(folderPath);

      const html = printShiftTemplate(body);
      const reportName = `shift-${new Date().getTime()}.png`;
      const savePath = `${folderPath}/${reportName}`;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      await page.screenshot({
        path: savePath,
        fullPage: true,
      });
      await browser.close();

      const printer = await this.createPrinter();
      printer.alignCenter();
      await printer.printImage(savePath);
      printer.alignLeft();
      await printer.printImage('./src/assets/icon/tomatelogoticket.png');
      printer.partialCut();
      await printer.execute();

      return 'Ticket de turno impreso correctamente';
    } catch (error) {
      console.log('Error al imprimir el ticket de turno');
      console.log(error);
    }
  }

  async printMojeReport(body: any) {
    try {
      const weekFolder = await this.getWeekFolderName();
      const folderPath = `C:/Reports/Moje/${weekFolder}`;
      await this.ensureReportsFolderExists(folderPath);

      const html = mojeReportTemplate(body);
      const reportName = `Moje-${new Date().getTime()}.png`;
      const savePath = `${folderPath}/${reportName}`;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      await page.screenshot({
        path: savePath,
        fullPage: true,
      });
      await browser.close();

      const printer = await this.createPrinter();
      printer.alignCenter();
      await printer.printImage(savePath);
      printer.alignLeft();
      await printer.printImage('./src/assets/icon/tomatelogoticket.png');
      printer.partialCut();
      await printer.execute();

      return 'Ticket de turno impreso correctamente';
    } catch (error) {
      console.log('Error al imprimir el ticket de turno');
      console.log(error);
    }
  }

  async printClosedBillsReport(body: any) {
    try {
      // hay que llevar todas las cuentas cerradas
      const BillsArray = await this.billService.findCurrent();
      // vamos a separar por cada una de las cuentas
      // luego ejecutamos el calculo del total por aca tipo
      // para al final sumarlos todos dado qu ejunto sno se podra por que l afuncion esta preparada solo para restaurante
      const finishedBills = BillsArray.filter(
        (bill) => bill.status === FINISHED_STATUS,
      );
      console.log('1 ');

      const finishedBillsRestaurant = finishedBills.filter(
        (bill) =>
          bill.sellType === 'ON_SITE_ORDER' ||
          bill.sellType === 'onSite' ||
          bill.sellType === 'n/A',
      );

      const exampleBody = {
        products: [
          {
            quantity: 2,
            prices: [
              {
                name: 'product1',
                price: 10,
              },
            ],
          },
        ],
        discount: {
          discountMount: '20',
          setting: 'SET_PERCENT',
        },
        functionName: 'calculateProductTotal',
      };
      //const exampleBodyJson = JSON.stringify(exampleBody);
      /*////////////////////////////////////////////////////////////////////////*/
      // /////////////Aca la logica de calcular con el archivo externo /////////*/
      // /////////////////////////////////////////////////////////////////////// */
       // const result = await this.runCalculoExe(exampleBodyJson);

     

      ////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////
      // por ejemplo tener un. exe aca que me haga todos los calculos y que siga el servicio despues
      return finishedBillsRestaurant;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  private async runCalculoExe(inputJson: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Parseamos el JSON recibido
        const parsedBody = JSON.parse(inputJson);

        // Extraemos los parámetros necesarios desde el JSON
        const products = JSON.stringify(parsedBody.products); // Ejemplo de extraer productos
        const discount = JSON.stringify(parsedBody.discount); // Ejemplo de extraer descuento
        const functionName = parsedBody.functionName; // Ejemplo de extraer nombre de función

        // Ahora, pasamos los parámetros como argumentos al ejecutable
        const exePath = join(__dirname, 'bin', 'calculo.exe');
        console.log('Ruta al ejecutable:', exePath); // Verifica la ruta generada
        const process = spawn(exePath, [products, discount, functionName]);

        let output = '';
        let errorOutput = '';

        // Capturamos la salida estándar del ejecutable
        process.stdout.on('data', (data) => {
          output += data.toString(); // Acumulamos la salida
        });

        // Capturamos los errores del ejecutable
        process.stderr.on('data', (data) => {
          errorOutput += data.toString(); // Acumulamos los errores
        });

        // Capturamos el cierre del proceso
        process.on('close', (code) => {
          if (code === 0) {
            resolve(output); // Si todo va bien, resolvemos con la salida
          } else {
            reject(
              new Error(
                `El proceso terminó con el código ${code}: ${errorOutput}`,
              ),
            ); // Si hay un error, rechazamos
          }
        });
      } catch (error) {
        reject(new Error('Error al procesar el JSON o ejecutar el calculo'));
      }
    });
  }
}
