import Vue from 'vue';
import Router from 'vue-router';
import CatchTable from '@/components/pages/CatchTable/Index';
import OrderProducts from '@/components/pages/OrderProducts/Index';
import NoLsItem from '@/components/pages/NoLsItem/Index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'catchTable',
            component: CatchTable
        },
        {
            path: '/order-products',
            name: 'OrderProducts',
            component: OrderProducts
        },
        {
            path: '/no-ls-item',
            name: 'noLsItem',
            component: NoLsItem
        }
    ]
});
