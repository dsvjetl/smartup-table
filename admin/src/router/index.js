import Vue from 'vue';
import Router from 'vue-router';
import Tables from '@/components/pages/Tables/Index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'tables',
            component: Tables
        }
    ]
});
