import Vue from 'vue';
import Router from 'vue-router';
import CatchTable from '@/components/pages/CatchTable/Index';
import OrderProducts from '@/components/pages/OrderProducts/Index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'catch-table',
            component: CatchTable
        },
        {
            path: '/order-products',
            name: 'OrderProducts',
            component: OrderProducts
        }
    ]
});
