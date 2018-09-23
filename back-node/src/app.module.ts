import { Module } from '@nestjs/common';
import { TablesModule } from './tables/tables.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TablesModule, ProductsModule]
})
export class AppModule {}
