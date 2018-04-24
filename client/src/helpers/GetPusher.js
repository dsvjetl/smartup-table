import router from '@/router/index';
import Pusher from 'pusher-js';

let instance = null;
export class GetPusher {

    constructor(store) {
        this._store = store;
        this._pusher = null;

        this.initPusher();
        this.allowConnection();
        this.tryTableConnection();
    }

    //-getters-//

    get tableId() {
        return router.currentRoute.query.t;
    }

    get store() {
        return this._store;
    }

    get pusher() {
        return this._pusher;
    }


    //-setters-//

    set pusher(value) {
        this._pusher = value;
    }


    //-methods-//

    initPusher() {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
        this.pusher = new Pusher('3770a3be61611f7a1415', {
            cluster: 'eu',
            encrypted: true
        });
    }

    allowConnection() {
        const channel = this.pusher.subscribe(`t${this.tableId}`);
        channel.bind('allowConnection', (data) => {
            console.log(data);
        });
    }

    tryTableConnection() {
        const channel = this.pusher.subscribe(`t${this.tableId}`);
        channel.bind('tryTableConnection', (data) => {
            console.log(data);
        });
    }
}