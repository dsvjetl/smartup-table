<template>
    <div id="app">
        <app-header
            v-if="currentRouteName != 'catchTable'"
        />
        <router-view/>
    </div>
</template>

<script>
    // helpers
    import {GetPusher} from "./helpers/GetPusher";
    import {ConnectionValidation} from "./helpers/ConnectionValidation";

    // components
    import AppHeader from '@/components/header/AppHeader';

    export default {
        name: 'App',

        data() {
            return {
                currentRouteName: null
            }
        },

        components: {
            AppHeader
        },

        created() {
            const pusher = new GetPusher(this.$store, this.$router);
            const connectionValidation = new ConnectionValidation(this.$router, this.$store);

            this.currentRouteName = this.$router.currentRoute.name;
            console.log(this.currentRouteName);
            this.$router.afterEach((to, from) => {
                this.currentRouteName = to.name;
            });
        }
    }
</script>

<style lang="scss">
    @import "./scss/style";
</style>
