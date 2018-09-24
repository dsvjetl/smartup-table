export interface GetTables_dto {
    id: number,
    active: number | boolean,
    token: string
}

export interface ConnDiscTable_req_dto {
    tableId: number
}

export interface TokenConnectTable_res_dto {
    tableId: number,
    token: string
}