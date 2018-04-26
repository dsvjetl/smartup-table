<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    // helpers
    import {GetPusher} from "./helpers/GetPusher";

    export default {
        name: 'App',

        mounted() {
            const pusher = new GetPusher(this.$store, this.$router);
        }
    }
</script>

<style lang="scss">
    @import "./scss/style";
</style>
