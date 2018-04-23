<template>
    <div id="app">
        <app-header/>
        <router-view/>
    </div>
</template>

<script>
    // components
    import AppHeader from '@/components/header/AppHeader';

    export default {
        name: 'App',

        created() {
            this.$store.dispatch('getAllTables');
        },

        components: {
            AppHeader
        }
    }
</script>

<style lang="scss">
    @import "./scss/style";
</style>
