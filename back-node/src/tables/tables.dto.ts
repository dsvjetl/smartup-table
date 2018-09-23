export interface GetTables_dto {
    id: number,
    active: number | boolean,
    token: string
}

export interface ConnDiscTable_dto {
    tableId: number
}

export interface TokenConnectTable_dto {
    tableId: number,
    token: string
}