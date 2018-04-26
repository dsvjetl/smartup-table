import axios from 'axios';

export const axiosDB = axios.create({
    baseURL: 'http://localhost/smartup-table/back/requests/'
});

export const urls = {
    get: {
        allTables: 'getAllTables.php'
    },
    post: {
        connectToTable: 'connectToTable.php'
    }
};