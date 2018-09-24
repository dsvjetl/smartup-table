import
{Injectable} from '@nestjs/common';
import {DatabaseService} from '../services/DatabaseService';
import {
    GetAllProducts_res_dto,
    GetAllCategorizedProducts_res_dto,
    GetOrdersByTokenAndId_res_dto,
    GetOrdersByTokenAndId_req_dto
} from './products.dto';
import * as _ from 'lodash';

@Injectable()
export class ProductsService {
    static async getAllProducts(): Promise<GetAllProducts_res_dto[]> {
        return await DatabaseService.exec<GetAllProducts_res_dto[]>(`SELECT 
        p.id product_id,
        p.amount product_amount,
        p.available product_available, 
        p.name product_name,
        p.price product_price,
        pc.id product_category_id,
        pc.name product_category_name
        FROM products as p
        INNER JOIN products_categories pc on p.products_categories_id = pc.id`);
    }

    static async getAllCategorizedProducts(): Promise<GetAllCategorizedProducts_res_dto[]> {
        const products: GetAllProducts_res_dto[] = await this.getAllProducts();

        let categories: { product_category_id: number, product_category_name: string }[] = products.map(product => ({
            product_category_id: product.product_category_id,
            product_category_name: product.product_category_name
        }));
        categories = _.uniqWith(categories, _.isEqual);

        return categories.map(category => ({
            product_category_id: category.product_category_id,
            product_category_name: category.product_category_name,
            products: products.filter(product => product.product_category_id === category.product_category_id)
        }));
    }

    static async getOrdersByTokenAndId(getOrdersByTokenAndId_req: GetOrdersByTokenAndId_req_dto): Promise<GetOrdersByTokenAndId_res_dto[]> {
        return await DatabaseService.exec<GetOrdersByTokenAndId_res_dto[]>(`SELECT
          op.id           AS id,
          op.productId    AS productId,
          op.productCount AS productCount,
          o.id            AS orderId,
          p.name          AS productName,
          p.price         AS productPrice,
          p.amount        AS productAmount,
          o.tableId       AS tableId,
          o.delivered     AS delivered,
          o.token         AS token,
          o.total         AS total,
          (SELECT SUM(o.total) FROM orders o WHERE o.token = '${getOrdersByTokenAndId_req.token}') AS totalBill
        FROM order_products op
          INNER JOIN orders o ON op.orderId = o.id
          INNER JOIN products p ON op.productId = p.id
        WHERE o.token = '${getOrdersByTokenAndId_req.token}' AND o.tableId = '${getOrdersByTokenAndId_req.tableId}'`);
    }
}
