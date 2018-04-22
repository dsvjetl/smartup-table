import Vue from 'vue';
import Router from 'vue-router';
import CatchTable from '@/components/pages/CatchTable/Index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'CatchTable',
            component: CatchTable
        }
    ]
});
