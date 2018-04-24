<template>
    <div class="co-catch-table">
        <h3>Odobravanje stola {{tableId}}</h3>
    </div>
</template>

<script>
    export default {
        name: 'CatchTableIndex',

        computed: {
            tableId() {
                return this.$route.query.t;
            }
        },

        mounted() {
            // this.$store.dispatch('connectToTable', Number(this.tableId));
        }
    }
</script>

<style lang="scss" scoped>

</style>