import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  ConflictException,
  NotFoundException,
  Body,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/catalogo/products/createProduct.dto';
import { UpdateProductDto } from 'src/dto/catalogo/products/updatedProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  async findAll() {
    try {
      const productsArray = await this.productService.findAll();
      if (!productsArray || productsArray.length === 0)
        throw new NotFoundException('No se encontraron productos');
      return productsArray;
    } catch (error) {
      throw new NotFoundException('Ocurrio algo inesperado');
    }
  }

  @Get(':id')
  async findOne(@Body() body: string) {
    try {
      const selectedProduct = await this.productService.findOne(body);
      if (!selectedProduct)
        throw new ConflictException(
          'El producto que intentas encontrar no existe',
        );
      return;
    } catch (error) {}
  }

  @Post()
  async create(@Body() body: CreateProductDto | CreateProductDto[]) {
    console.log(body);

    const proService = this.productService;
    try {
      if (Array.isArray(body)) {
        await this.productService.replace();
        const createdProduct = await Promise.all(
          body.map(async (element: CreateProductDto) => {
            return await proService.create(element);
          }),
        );
        return createdProduct;
      } else {
        const createdProduct = await this.productService.create(body); // Usar la variable categoriesService
        return createdProduct;
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('El producto ya existe');
      } else {
        throw new NotFoundException('Ha ocurrido algo inesperado');
      }
    }
  }

  @Post('table-add')
  async createWithTable(@Body() body: CreateProductDto | CreateProductDto[]) {
    console.log(body);

    try {
      // Verifica si es un array
      if (Array.isArray(body)) {
        const createdProducts = [];
        for (const element of body) {
          const createdProduct = await this.productService.create(element);
          createdProducts.push(createdProduct);
        }
        return {
          message: 'Productos creados exitosamente',
          products: createdProducts,
        };
      } else {
        // Si no es un array, crea un único producto
        const createdProduct = await this.productService.create(body);
        return {
          message: 'Producto creado exitosamente',
          product: createdProduct,
        };
      }
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('El producto ya existe');
      } else {
        throw new NotFoundException('Ha ocurrido algo inesperado');
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const deletedProduct = await this.productService.delete(id);
      if (!deletedProduct) throw new NotFoundException('No existe el producto');
      return deletedProduct;
    } catch (error) {
      throw new NotFoundException('Ha ocurrdo algo inesperado');
    }
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    try {
      const updatedProduct = await this.productService.update(id, body);
      if (!updatedProduct) throw new NotFoundException('No existe el producto');
      return updatedProduct;
    } catch (error) {
      throw new NotFoundException('Ha ocurrido algo inesperado');
    }
  }
}
