import {Body, Controller, Get, Post} from '@nestjs/common';
import {TablesService} from './tables.service';
import {ConnDiscTable_req_dto, TokenConnectTable_res_dto} from './tables.dto';

@Controller('tables')
export class TablesController {
    @Get()
    getTables() {
        return TablesService.getTables();
    }

    @Post('/connect')
    connectTable(@Body() body: ConnDiscTable_req_dto) {
        return TablesService.connectTable(body.tableId);
    }

    @Post('/disconnect')
    disconnectTable(@Body() body: ConnDiscTable_req_dto) {
        return TablesService.disconnectTable(body.tableId);
    }

    @Post('/token-connect')
    tokenConnectTable(@Body() body: TokenConnectTable_res_dto) {
        return TablesService.tokenConnectTable(body);
    }
}
