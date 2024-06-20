import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import puppeter from 'puppeteer';
import pdf from 'html-pdf';
import { cashierSessionReport } from './reportsTemplates/cashierSessionReport';
import {
  CharacterSet,
  PrinterTypes,
  ThermalPrinter,
} from 'node-thermal-printer';
import fs from 'fs';
import path from 'path';
import { title } from 'process';
import { content } from 'pdfkit/js/page';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
  ) {}

  async closeCashierSession(body: any) {
    console.log('llegue hasta la impresion bandita');

    try {
      const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: `tcp://192.168.1.70`,
        characterSet: CharacterSet.SLOVENIA,
        removeSpecialCharacters: false,
        width: 42,
        options: {
          timeout: 10000,
        },
        // Adjust the timeout value in milliseconds
      });

      const html = cashierSessionReport(body);

      ///////////////////////////////////////
      /* Proceso de impresion             */
      ///////////////////////////////////////

      const reportName = `${new Date().getTime()}.png`;

      // generamos imagen con puppeteer
      const browser = await puppeter.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      await page.screenshot({
        path: reportName,
        fullPage: true,
      });
      await browser.close();
      printer.alignCenter();
      await printer.printImage('./src/assets/icon/TomateTaqueria.png');

      await printer.printImage(`./${reportName}`);

      // Ahora vamos a imprimir la imagen

      ///////////////////////////////////////
      /* Proceso de impresion             */
      ///////////////////////////////////////

      // Cortar el papel
      printer.partialCut();
      await printer.execute();
      await printer.execute();

      console.log('Ticket impreso correctamente');
    } catch (error) {
      console.log('Error al imprimir');
      console.log(error);
    }

    //////////////////////////////////////////////////////
    /*    cierre de metodo de caja                      */
    ////////////////////////////////////////////////////////

    // aca qvamos a seguir lo que vamos ha hacer es empezar a crear los templkates para los reportes
    /* const report = cashierSessionReport(body.data);
    pdf.create(report).toStream(async (err, stream) => {
      if (err) return console.error(err);

      // Leer el archivo PDF y enviarlo a la impresora
      fs.readFile('./ticket.pdf', async (err, data) => {
        if (err) return console.error(err);

        // Configuración de la impresora
        let printer = new ThermalPrinter({
          type: PrinterTypes.EPSON,
          interface: 'tcp://192.168.192.168',
        });

        try {
          let isConnected = await printer.isPrinterConnected();
          if (!isConnected) {
            console.log('Impresora no conectada');
            throw new Error('Impresora no conectada');
          }

          printer.print('funciona perfecto');
          await printer.execute();
          console.log('Impresora no conectada');
          throw new Error('Ticket impreso correctamente');
        } catch (error) {
          console.log('Impresora no conectada');
          throw new Error('Error al imprimir: ' + error.message);
        }
      });
    });
    */
  }
}
