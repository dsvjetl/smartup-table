import {Controller, Get} from '@nestjs/common';
import {ProductsService} from './products.service';

@Controller('products')
export class ProductsController {
    @Get()
    getAllProducts() {
        return ProductsService.getAllProducts();
    }

    @Get('/all-categorized')
    getAllCategorizedProducts() {
        return ProductsService.getAllCategorizedProducts();
    }
}
