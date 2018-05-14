import axios from 'axios';

export const axiosDB = axios.create({
    baseURL: 'http://localhost/smartup-table/back/requests/'
});

export const urls = {
    get: {
        allTables: 'getAllTables.php',
        getAllProducts: 'getAllProducts.php',
        getOrderedProducts: 'getOrderedProducts.php'
    },
    post: {
        connectToTable: 'connectToTable.php',
        makeDelivered: 'makeDelivered.php',
        disconnectTable: 'disconnectTable.php'
    }
};