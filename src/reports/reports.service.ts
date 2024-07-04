import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import puppeteer from 'puppeteer';
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

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
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
      interface: `tcp://192.168.1.74`,
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
}
