import {Controller, Get, Post, Body, Query} from '@nestjs/common';
import {ProductsService} from './products.service';
import {GetOrdersByTokenAndId_req_dto} from './products.dto';

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

    // TODO: change total bill, orderId etc. to level up object!
    @Get('/get-orders-token-id')
    getOrdersByTokenAndId(@Query() GetOrdersByTokenAndId_req: GetOrdersByTokenAndId_req_dto) {
        return ProductsService.getOrdersByTokenAndId(GetOrdersByTokenAndId_req);
    }
}
