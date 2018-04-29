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
        commit('connectToTable', {status: false});
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
    },

    connectWithToken({commit}, {token, tableId}) {
        console.log(token, tableId);
        return new Promise(((resolve, reject) => {
            axiosDB.post(urls.post.connectWithToken, {
                token,
                tableId
            })
                .then(res => {
                    resolve(res.data.data);
                })
                .catch(e => {
                    console.error(e);
                    reject(e);
                });
        }));
    },

    makeOrder({commit, state}, total) {
        const orderedProducts = [];
        state.cart.undelivered.forEach(product => {
            orderedProducts.push({
                productId: product.id,
                productCount: product.count
            });
        });
        const req = {
            tableId: state.tableId,
            token: state.token,
            orderedProducts,
            total
        };
        return new Promise(((resolve, reject) => {
            axiosDB.post(urls.post.makeOrder, req)
                .then(res => {
                    console.log(res);
                    resolve();
                })
                .catch(e => {
                    console.error(e);
                    reject();
                });
        }));
    },

    getOrderedProducts({commit, state}) {
        return new Promise((resolve, reject) => {
            axiosDB.get(`${urls.get.getOrderedProducts}?tableId=${state.tableId}&token=${state.token}`)
                .then(res => {
                    console.log(res);
                    commit('updateOrderedProducts', res.data.data);
                    resolve();
                })
                .catch(e => {
                    console.error(e);
                    reject();
                });
        });
    }
};