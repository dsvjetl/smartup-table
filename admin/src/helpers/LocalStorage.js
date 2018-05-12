let instance = null;

export class LocalStorage {

    constructor() {
        if (instance === null) {
            instance = this;
        }
        return instance;
    }

    /**
     *
     * @return {class | boolean}
     */
    static getInstance() {
        if (instance === null) {
            instance = new LocalStorage();
        }
        return instance;
    }


    //-methods-//

    localStorageExists() {
        if (typeof(Storage) !== "undefined") {
            return true;
        } else {
            console.warn('Sorry! No Web Storage support..');
            return false;
        }
    }

    /**
     *
     * @param {object} item
     */
    saveItem(item) {
        console.log(item);
        const stringItem = JSON.stringify(item);
        localStorage.setItem('smart-table', stringItem);
    }

    /**
     *
     * @return {object}
     */
    setItem() {
        return JSON.parse(localStorage.getItem('smart-table')) ? JSON.parse(localStorage.getItem('smart-table')) : false;
    }

    /**
     *
     */
    removeItem() {
        localStorage.removeItem('smart-table');
    }
}