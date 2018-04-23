import router from '@/router/index';
import Pusher from 'pusher-js';

let instance = null;
export class GetPusher {

    constructor(store) {
        this._store = store;
        this._pusher = null;

        this.initPusher();
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

    listenChannels(event) {
        const channel = this.pusher.subscribe(`t${this.tableId}`);
        channel.bind(event, function(data) {
            console.log(data);
        });
    }
}