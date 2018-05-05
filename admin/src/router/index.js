import Vue from 'vue';
import Router from 'vue-router';
import Tables from '@/components/pages/Tables/Index';
import Table from '@/components/pages/Table/Index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Tables',
            component: Tables
        },
        {
            path: '/table/:t',
            name: 'Table',
            component: Table
        }
    ]
});
