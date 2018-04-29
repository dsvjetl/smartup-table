import {axiosDB, urls} from "../axios/axiosDB";

export const actions = {
    getAllTables({commit}) {
        return new Promise(((resolve, reject) => {
            axiosDB.get(urls.get.allTables)
                .then(response => {
                    commit('updateAllTables', response.data.data);
                    resolve();
                })
                .catch(error => {
                    console.error(error);
                    reject();
                });
        }));
    },

    connectToTable({commit}, tableId) {
        return new Promise(((resolve, reject) => {
            axiosDB.post(urls.post.connectToTable, {tableId})
                .then(res => {
                    console.log(res.data.data);
                    if (!res.data.data.status) return;
                    commit('setConnectedTables', tableId);
                    resolve();
                })
                .catch(e => {
                    console.error(e);
                    reject();
                });
        }));
    },

    getAllProducts({commit}) {
        return new Promise(((resolve, reject) => {
            axiosDB.get(urls.get.getAllProducts)
                .then(res => {
                    console.log(res);
                    commit('setAllProducts', res.data.data);
                    resolve();
                })
                .catch(e => {
                    console.error(e);
                    reject();
                });
        }));
    },
};