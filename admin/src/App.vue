<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',

        created() {
            this.$store.dispatch('getAllTables');
        }
    }
</script>

<style lang="scss">
    @import "./scss/style";
</style>
