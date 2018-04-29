import axios from 'axios';

export const axiosDB = axios.create({
    baseURL: 'http://localhost/smartup-table/back/requests/'
});

export const urls = {
    get: {
        getAllProducts: 'getAllProducts.php',
        getOrderedProducts: 'getOrderedProducts.php'
    },
    post: {
        connectToTable: 'connectToTable.php',
        tryTableConnection: 'tryTableConnection.php',
        connectWithToken: 'connectWithToken.php',
        makeOrder: 'makeOrder.php'
    }
};