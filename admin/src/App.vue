<template>
    <div id="app">
        <app-header/>
        <router-view/>
    </div>
</template>

<script>
    // components
    import AppHeader from '@/components/header/AppHeader';

    // helpers
    import {GetPusher} from "./helpers/GetPusher";

    export default {
        name: 'App',

        created() {
            this.$store.dispatch('getAllTables');
        },

        mounted() {
            const pusher = new GetPusher(this.$store);
        },

        components: {
            AppHeader
        }
    }
</script>

<style lang="scss">
    @import "./scss/style";
</style>
