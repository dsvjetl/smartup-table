<template>
    <ul>
        <li
                class="co-tables__li"
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
        <div class="u-clear"></div>
    </ul>
</template>

<script>
    export default {
        name: 'Tables',

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
            padding: 5px 20px 13px;
            border-radius: 3px;
            border: 2px solid $white;
            margin: 5px;
            transition: transform .3s ease-in-out, background-color .3s ease-in-out;

            &.is-try-active {
                background-color: red;
            }

            &.is-ordering {
                background-color: green;
            }

            &:hover {
                transform: scale(1.1);
                cursor: pointer;
                background-color: $gray-light;
            }
        }

        &__table-id {

        }

        &__table-img {
            width: 25px;
            height: 25px;
            padding-left: 15px;
            position: relative;
            top: 7px;
        }

        &__li {
            float: left;
        }
    }
</style>
