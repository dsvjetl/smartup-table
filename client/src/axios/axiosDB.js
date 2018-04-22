import axios from 'axios';

export const axiosDB = axios.create({
    baseURL: 'http://localhost/smartup-table/back/requests/'
});

export const urls = {
    post: {
        connectToTable: 'connectToTable.php'
    }
};