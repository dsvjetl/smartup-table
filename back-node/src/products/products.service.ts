import
{Injectable} from '@nestjs/common';
import {DatabaseService} from '../services/DatabaseService';
import {GetAllProducts_dto, GetAllCategorizedProducts_dto} from './products.dto';
import * as _ from 'lodash';

@Injectable()
export class ProductsService {
    static async getAllProducts(): Promise<GetAllProducts_dto[]> {
        return await DatabaseService.exec<GetAllProducts_dto[]>(`SELECT 
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

    static async getAllCategorizedProducts(): Promise<GetAllCategorizedProducts_dto[]> {
        const products: GetAllProducts_dto[] = await this.getAllProducts();

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
}
