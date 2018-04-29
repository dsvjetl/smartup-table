import {LocalStorage} from "./LocalStorage";

export class ConnectionValidation {
    constructor(router, store) {
        this._router = router;
        this._store = store;

        this.validateLsServer();
    }


    //-getters-//

    get router() {
        return this._router;
    }

    get store() {
        return this._store;
    }

    get token() {
        console.log(LocalStorage.getInstance().setItem());
        return LocalStorage.getInstance().setItem().token;
    }

    get tableId() {
        return Number(this.router.currentRoute.query.t);
    }


    //-setters-//

    set token(value) {
        this._token = value;
    }


    //-methods-//

    localStorageExists() {
        if (!LocalStorage.getInstance().localStorageExists()) {
            return false;
        }
    }

    validateLsClient() {
        if (!localStorage.getItem('smart-table')) {
            this.router.push({name: 'catchTable', query: {t: this.tableId}});
        }
        else {
            this.token = LocalStorage.getInstance().setItem();
            this.validateLsServer();
        }
    }

    validateLsServer() {
        this.store.dispatch('connectWithToken', {
            token: this.token,
            tableId: this.tableId
        })
            .then(data => {
                if (data.status) {
                    this.store.commit('connectToTable', {status: data.status, tableId: Number(this.tableId), token: data.token});
                    LocalStorage.getInstance().saveItem({token: data.token});
                }
                else {
                    this.router.push({name: 'catchTable', query: {t: this.tableId}});
                }
            })
            .catch(e => {
                this.router.push({name: 'catchTable', query: {t: this.tableId}});
            });
    }
}