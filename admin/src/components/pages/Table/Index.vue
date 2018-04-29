<template>
    <div class="co-table o-layout">
        <table v-for="orderId in ordersIds">
            <thead>
            <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr
                    v-for="(product, index) in orderedProducts"
                    :key="index"
                    v-if="orderId == product.id"
            >
                <td>
                    {{product.id}}
                </td>
                <td>
                    {{getCurrentProduct(product.productId).name}}
                    {{getCurrentProduct(product.productId).amount}}L
                </td>
                <td>
                    x {{product.productCount}}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'TableIndex',

        data() {
            return {
                tableId: this.$router.currentRoute.query.t
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
                const ordersIds = this.orderedProducts.map(product => product.id);
                const uniqueIds = ordersIds.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                });
                return uniqueIds.reverse();
            }
        },

        methods: {
            getCurrentProduct(productId) {
                return this.allProducts.filter(product => product.id === productId)[0];
            }
        }
    }
</script>

<style lang="scss" scoped>
    .co-table {
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        td, th {
            padding: 5px;
            text-align: center;
        }

        table {
            margin-top: 25px;
        }
    }
</style>
