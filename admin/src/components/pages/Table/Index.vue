<template>
    <div class="co-table o-layout">
        <div>
            <h2>
                Total price: {{totalPrice}} kn
            </h2>
        </div>
        <table
            v-for="orderId in ordersIds"
            :key="orderId"
            :class="{'is-delivered': isDelivered(orderId)}"
        >
            <thead>
            <tr>
                <th>Product</th>
                <th>Amount</th>
                <th>Product price</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(product, index) in orderedProducts"
                :key="index"
                v-if="orderId == product.orderId"
            >
                <td>
                    {{product.productName}}
                    <span class="co-table__amount-unit">{{product.productAmount}}L</span>
                </td>
                <td>
                    x {{product.productCount}}
                </td>
                <td>
                    {{product.productPrice}} kn
                </td>
                <td>
                    {{Number(product.productPrice * product.productCount).toFixed(2)}} kn
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <div class="co-table__order-info">
                        <span>Table: {{getTableId(orderId)}}</span>
                        <span>Total: {{getOrderTotal(orderId)}} kn</span>
                    </div>
                    <div class="co-table__buttons">
                        <button
                            v-if="!isDelivered(orderId)"
                            class="c-btn c-btn--primary"
                            @click="deliver(orderId)"
                        >
                            Deliver
                        </button>
                        <h2
                            class="co-table__is-delivered-msg u-h2"
                            v-else
                        >Delivered</h2>
                    </div>
                    <div class="u-clear"></div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    // Helpers
    import {LocalStorage} from "@/helpers/LocalStorage";

    export default {
        name: 'TableIndex',

        data() {
            return {
                tableId: this.$route.params.t
            }
        },

        computed: {
            allProducts() {
                return this.$store.state.allProducts;
            },

            orderedProducts() {
                return this.$store.state.orderedProducts;
            },

            ordersIds() {
                const ordersIds = this.orderedProducts.map(product => product.orderId);
                const uniqueIds = ordersIds.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                });
                return uniqueIds.reverse();
            },

            totalPrice() {
                return this.orderedProducts.length <= 0 ? 0 : this.orderedProducts[0].totalBill;
            },
        },

        methods: {
            getOrderTotal(orderId) {
                return this.orderedProducts.filter(product => product.orderId === orderId)[0].total;
            },

            getTableId(orderId) {
                return this.orderedProducts.filter(product => product.orderId === orderId)[0].tableId;
            },

            deliver(orderId) {
                this.$store.dispatch('makeDelivered', {
                    tableId: this.getTableId(orderId),
                    token: this.orderedProducts[0].token,
                    orderId
                });
            },

            isDelivered(orderId) {
                return this.orderedProducts.filter(product => product.orderId === orderId)[0].delivered === '1';
            }
        },

        created() {
            if (this.orderedProducts.length <= 0) {
                this.$store.dispatch('getOrderedProducts', {
                    tableId: this.$route.params.t,
                    token: LocalStorage.getInstance().setItem().currentToken
                });
            }
            else {
                const saveItem = {'currentToken': this.orderedProducts[0].token};
                LocalStorage.getInstance().saveItem(saveItem);
            }
        },

        beforeDestroy() {
            LocalStorage.getInstance().removeItem();
        }
    }
</script>

<style lang="scss" scoped>
    .co-table {
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        th {
            background-color: $blue-dark;
            color: $white;
            text-transform: uppercase;
            font-weight: normal;
        }

        td, th {
            padding: 5px;
            text-align: center;
        }

        table {
            margin-top: 25px;

            &.is-delivered {
                opacity: .5;

                th {
                    background-color: $blue-dark-dark;
                }
            }
        }

        &__amount-unit {
            color: $blue-dark;
        }

        &__order-info {
            float: left;
        }

        &__buttons {
            float: right;
        }

        &__is-delivered-msg {
            color: #000;
            font-size: 16px;
            margin: 0;
            color: green;
        }
    }
</style>
