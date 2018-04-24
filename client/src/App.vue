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
            const pusher = new GetPusher(this.$store);

            this.$store.dispatch('tryTableConnection', Number(this.$route.query.t));
        }
    }
</script>

<style lang="scss">
    @import "./scss/style";
</style>
