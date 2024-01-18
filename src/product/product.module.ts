import { Module } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class ProductModule {}
