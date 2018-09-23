export interface GetAllProducts_dto {
    product_id: number,
    product_amount: number,
    product_available: number | boolean,
    product_name: string,
    product_price: number,
    product_category_id: number,
    product_category_name: string
}

export interface GetAllCategorizedProducts_dto {
    product_category_id: number,
    product_category_name: string,
    products: GetAllProducts_dto[]
}