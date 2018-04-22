import {axiosDB, urls} from "../axios/axiosDB";

export const actions = {
    connectToTable({commit}, tableId) {
        return new Promise(((resolve, reject) => {
            axiosDB.post(urls.post.connectToTable, {
                tableId
            })
                .then(response => {
                    console.log(response);
                    resolve();
                })
                .catch(error => {
                    console.error(error);
                    reject();
                });
        }));
    }
};