<template>
    <div class="co-catch-table o-layout">
        <h3>Approving table {{tableId}}</h3>
        <pulse-loader></pulse-loader>
        <p>Loading</p>
        <small>Don't leave this page if you want to connect</small>
    </div>
</template>

<script>
    // plugins
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        name: 'CatchTableIndex',

        computed: {
            tableId() {
                return this.$route.query.t;
            }
        },

        components: {
            PulseLoader
        },

        created() {
            this.$store.dispatch('tryTableConnection', Number(this.$route.query.t));
        }
    }
</script>

<style lang="scss" scoped>
    .co-catch-table {
        text-align: center;
    }
</style>