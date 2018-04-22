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
    }
};