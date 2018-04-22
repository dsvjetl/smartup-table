<template>
    <div class="co-tables">
        <h1>Tables</h1>

        <ul>
            <li
                    v-if="allTables.length > 0"
                    v-for="table in allTables"
            >
                <div
                        class="co-tables__table-item"
                        :class="[
                            {'is-try-active': table.active === '1'}
                        ]"
                >
                    <span class="co-tables__table-id">{{table.id}}</span>
                    <img class="co-tables__table-img" src="../../../assets/table.png">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'TablesIndex',

        computed: {
            allTables() {
                return this.$store.state.tables;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .co-tables {

        &__table-item {
            position: relative;
            font-size: 16px;
            display: inline-block;
            padding: 5px 20px 10px;
            border-radius: 3px;

            &.is-try-active {
                background-color: red;
            }

            &.is-ordering {
                background-color: green;
            }
        }

        &__table-id {

        }

        &__table-img {
            width: 25px;
            height: 25px;
            padding-left: 15px;
            position: relative;
            top: 6px;
        }
    }
</style>