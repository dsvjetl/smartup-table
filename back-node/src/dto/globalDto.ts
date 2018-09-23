export interface MysqlRowChange_dto {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: boolean,
    changedRows: number
}

export interface ConnectWithToken_dto {
    active: number | boolean,
    id: number,
    token: string
}