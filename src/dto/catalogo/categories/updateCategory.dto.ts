import { Category } from 'src/schemas/catalogo/categories.schema';
import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @Length(1, 16)
  code?: string;

  @IsOptional()
  @Length(1, 35)
  categoryName?: string;

  @IsOptional()
  subCategories?: Category[];

  @IsOptional()
  parentCategory?: Category | null;

  @IsString()
  @Length(1, 8)
  @IsOptional()
  status?: 'disabled' | 'enabled';
}
