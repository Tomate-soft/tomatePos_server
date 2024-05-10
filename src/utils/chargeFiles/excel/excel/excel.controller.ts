import { Controller, UseInterceptors, Post, UploadedFile, NotFoundException } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../multer.config';
import { NotFoundError } from 'rxjs';

@Controller('excel')
export class ExcelController {
    constructor(private readonly excelService : ExcelService) {}

    // HACER VALIDACIONES CORRESPONDIENTES
    @Post("upload")
    @UseInterceptors(FileInterceptor("file", multerOptions))
    async uploadCategories(@UploadedFile() file){
        try {
            const data = await this.excelService.processExcel(file)
            console.log(data);
            return data;
        } catch (error) {
            throw new NotFoundException("No se ha podido subir el archivo")
        }      

    }
}
