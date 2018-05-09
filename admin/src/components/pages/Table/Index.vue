<template>
    <div class="co-table o-layout">
        <table v-for="orderId in ordersIds">
            <thead>
            <tr>
                <th>ID</th>
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
                    {{product.id}}
                </td>
                <td>
                    {{product.productName}}
                    {{product.productAmount}}L
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
                <td>
                    Total: {{orderTotal(orderId)}} kn
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
            }
        },

        methods: {
            orderTotal(orderId) {
                return this.orderedProducts.filter(product => product.orderId === orderId)[0].total;
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
