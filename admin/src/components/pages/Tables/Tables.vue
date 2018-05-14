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
                        {'is-try-active': tryTableConnectionTables.includes(table.id)},
                        {'is-connected': connectedTables.includes(table.id)},
                        {'is-disabled': tryTableConnectionTables.includes(table.id) === false && connectedTables.includes(table.id) === false},
                        {'is-ordering': isOrdering(table.id)}
                    ]"
                    @click="goToTable(table.id)"
            >
                <span class="co-tables__table-id">{{table.id}}</span>
                <img class="co-tables__table-img" src="../../../assets/table.png">

                <div
                        class="co-tables__approve-connect"
                        :class="[
                            {'is-try-active': tryTableConnectionTables.includes(table.id)}
                        ]"
                >
                    <button
                            class="c-btn c-btn--primary co-tables__btn-connect"
                            @click="approveTable(table.id)"
                    >
                        Connect
                    </button>
                    <button class="c-btn c-btn--primary co-tables__btn-disconnect">Disconnect</button>
                    <div class="u-clear"></div>
                </div>

                <div
                    class="co-tables__disconnect"
                    v-if="connectedTables.includes(table.id)"
                >
                    <button
                        class="c-btn c-btn--primary"
                        @click="disconnectTable(table.id)"
                    >
                        Disconnect
                    </button>
                </div>
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
            },

            tryTableConnectionTables() {
                return this.$store.state.tryTableConnectionTables;
            },

            connectedTables() {
                return this.$store.state.connectedTables;
            }
        },

        methods: {
            approveTable(tableId) {
                this.$store.dispatch('connectToTable', tableId);
            },

            isOrdering(tableId) {
                const orderingTableIds = this.$store.state.orderedProducts.map(product => Number(product.tableId));
                return orderingTableIds.includes(tableId);
            },

            goToTable(tableId) {
                if (this.isOrdering(tableId)) {
                    this.$router.push({name: 'Table', params: {t: tableId}});
                }
            },

            disconnectTable(tableId) {
                this.$store.dispatch('disconnectTable', tableId);
            }
        },

        mounted() {
            console.log(this.allTables);
        }
    }
</script>

<style lang="scss" scoped>
    .co-tables {

        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
        }

        &__table-item {
            position: relative;
            font-size: 16px;
            display: inline-block;
            padding: 5px 20px 13px;
            border-radius: 3px;
            border: 2px solid $gray-light;
            margin: 5px;
            transition: transform .3s linear,
            border .1s ease-in-out;

            &.is-try-active {
                background-color: red;
            }

            &.is-connected {
                background-color: $blue-dark;
            }

            &.is-ordering {
                background-color: green;
                color: $white;
                animation: pulse 1s infinite ease-in-out;

                &:hover {
                    animation: none;
                }
            }

            &.is-disabled {
                pointer-events: none;
            }

            &:hover {
                transform: scale(1.1);
                cursor: pointer;
                border: 2px solid $blue-light;

                .co-tables__approve-connect.is-try-active {
                    visibility: visible; // hover
                    opacity: 1; // hover
                }

                .co-tables__disconnect {
                    visibility: visible; // hover
                    opacity: 1; // hover
                }
            }
        }

        &__approve-connect {
            position: absolute;
            padding: 5px;
            bottom: -50px;
            left: -40px;
            width: 180px;
            visibility: hidden; // hover
            opacity: 0; // hover
            transition: visibility .3s ease-in-out,
            opacity .3s ease-in-out;
        }

        &__btn-connect {
            float: left;
        }

        &__btn-disconnect {
            float: right;
        }

        &__disconnect {
            position: absolute;
            bottom: -50px;
            left: 0;
            width: 100%;
            height: 50px;
            visibility: hidden; // hover
            opacity: 0; // hover
            transition: visibility .3s ease-in-out,
            opacity .3s ease-in-out;

            button {
                position: absolute;
                bottom: 0;
                background-color: red;
                color: $white;
            }
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
