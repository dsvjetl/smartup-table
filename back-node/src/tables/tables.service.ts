import {Injectable} from '@nestjs/common';
import {DatabaseService} from '../services/DatabaseService';
import {GetTables_dto, TokenConnectTable_dto} from './tables.dto';
import {MysqlRowChange_dto, ConnectWithToken_dto} from '../dto/globalDto';

@Injectable()
export class TablesService {
    static async getTables(): Promise<GetTables_dto[]> {
        return await DatabaseService.exec<GetTables_dto[]>('SELECT * FROM tables');
    }

    static async connectTable(tableId: number): Promise<MysqlRowChange_dto> {
        const token: string = String(+ new Date()) + String(Math.floor((Math.random() * 100) + 1));
        return await DatabaseService.exec<MysqlRowChange_dto>(`UPDATE tables SET active = TRUE, token = '${token}' WHERE id = '${tableId}'`);
    }

    static async disconnectTable(tableId: number): Promise<MysqlRowChange_dto> {
        return await DatabaseService.exec<MysqlRowChange_dto>(`UPDATE tables SET active = FALSE, token = '0' WHERE id = '${tableId}'`);
    }

    static async tokenConnectTable(tokenConnectTable: TokenConnectTable_dto): Promise<ConnectWithToken_dto[]> {
        return await DatabaseService.exec<ConnectWithToken_dto[]>(`SELECT * FROM tables WHERE id = '${tokenConnectTable.tableId}' AND token = '${tokenConnectTable.token}' LIMIT 1`);
    }
}
