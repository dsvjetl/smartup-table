import router from '@/router/index';
import Pusher from 'pusher-js';
import {LocalStorage} from "./LocalStorage";

let instance = null;

export class GetPusher {

    constructor(store, router) {
        this._store = store;
        this._pusher = null;
        this._router = router;

        this.initPusher();
        this.tryTableConnection();
        this.connectToTable();
        this.makeDelivered();
    }

    //-getters-//

    get store() {
        return this._store;
    }

    get pusher() {
        return this._pusher;
    }

    get router() {
        return this._router;
    }

    get tableId() {
        return this.router.currentRoute.query.t;
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

    connectToTable() {
        const channel = this.pusher.subscribe(`t${this.tableId}`);
        channel.bind('connectToTable', data => {
            if (!data.status) return;
            console.log(data);
            LocalStorage.getInstance().saveItem({token: data.token});
            this.store.commit('connectToTable', {status: data.status, tableId: Number(this.tableId), token: data.token});
            this.router.push({name: 'OrderProducts', query: {t: this.tableId}});
        });
    }

    tryTableConnection() {
        const channel = this.pusher.subscribe(`t${this.tableId}`);
        channel.bind('tryTableConnection', data => {
            console.log(data);
        });
    }

    makeDelivered() {
        const channel = this.pusher.subscribe(`t${this.tableId}`);
        channel.bind('makeDelivered', data => {
            this.store.commit('updateOrderedProducts', data);
        });
    }
}