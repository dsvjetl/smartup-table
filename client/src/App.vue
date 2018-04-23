<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {GetPusher} from "./helpers/GetPusher";

    export default {
        name: 'App',

        mounted() {
            const pusher = new GetPusher(this.$store);
            pusher.listenChannels('event');
        }
    }
</script>

<style lang="scss">
    @import "./scss/style";
</style>
