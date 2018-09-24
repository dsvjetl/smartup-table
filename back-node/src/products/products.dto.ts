export interface GetAllProducts_res_dto {
    product_id: number,
    product_amount: number,
    product_available: number | boolean,
    product_name: string,
    product_price: number,
    product_category_id: number,
    product_category_name: string
}

export interface GetAllCategorizedProducts_res_dto {
    product_category_id: number,
    product_category_name: string,
    products: GetAllProducts_res_dto[]
}

export interface GetOrdersByTokenAndId_res_dto {
    id: number,
    productId: number,
    productCount: number,
    orderId: number,
    productName: string,
    productPrice: number,
    productAmount: number,
    tableId: number,
    delivered: number | boolean,
    token: string,
    total: number,
    totalBill: number
}

export interface GetOrdersByTokenAndId_req_dto {
    tableId: string,
    token: number
}