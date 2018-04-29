import Pusher from 'pusher-js';

let instance = null;
export class GetPusher {

    constructor(store) {
        this._store = store;
        this._pusher = null;

        this.initPusher();

        this.tryTableConnection();
        this.makeOrder();
    }

    //-getters-//

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

    tryTableConnection() {
        const channel = this.pusher.subscribe('admin');
        channel.bind('tryTableConnection', (data) => {
            this.store.commit('setTryTableConnectionTables', data.tableId);
        });
    }

    makeOrder() {
        const channel = this.pusher.subscribe('admin');
        channel.bind('makeOrder', (data) => {
            this.store.commit('setOrderedProducts', data.data);
        });
    }
}