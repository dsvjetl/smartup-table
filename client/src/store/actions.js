import {axiosDB, urls} from "../axios/axiosDB";

export const actions = {
    connectToTable({commit}, tableId) {
        return new Promise(((resolve, reject) => {
            axiosDB.post(urls.post.connectToTable, {tableId})
                .then(response => {
                    console.log(response);
                    resolve();
                })
                .catch(error => {
                    console.error(error);
                    reject();
                });
        }));
    },

    tryTableConnection({commit}, tableId) {
        return new Promise(((resolve, reject) => {
            axiosDB.post(urls.post.tryTableConnection, {tableId})
                .then(response => {
                    console.log(response);
                    resolve();
                })
                .catch(error => {
                    console.error(error);
                    reject();
                });
        }));
    },

    getAllProducts({commit}) {
        return new Promise(((resolve, reject) => {
            axiosDB.get(urls.get.getAllProducts)
                .then(res => {
                    commit('setAllProducts', res.data.data);
                    resolve();
                })
                .catch(e => {
                    console.error(e);
                    reject();
                });
        }));
    }
};