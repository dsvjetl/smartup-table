<template>
    <div class="co-ordered">
        <ul
                class="co-ordered__ul"
                v-for="orderId in deliveredOrdersIds"
        >
            <li
                    class="co-ordered__li"
                    v-for="product in ordered"
                    :key="product.order_productsId"
                    v-if="orderId === product.id"
            >
                <span class="co-ordered__name">{{currentProduct(product.productId).name}}</span>
                <span class="co-ordered__amount">{{currentProduct(product.productId).amount}}L</span>
                <span>{{(Number(currentProduct(product.productId).price) * Number(product.productCount)).toFixed(2)}} kn</span>
                <span class="co-ordered__count">(x {{product.productCount}})</span>
            </li>
            <li>
                Total: {{totalAmount(orderId)}} kn
                <span class="co-ordered__delivered">{{delivered(orderId) ? 'Delivered' : 'Undelivered'}}</span>
                <div class="u-clear"></div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Ordered',

        computed: {
            ordered() {
                return this.$store.state.cart.delivered;
            },

            allProducts() {
                return this.$store.state.allProducts;
            },

            allDeliveredOrders() {
                return this.$store.state.cart.delivered;
            },

            deliveredOrdersIds() {
                const allIds = this.allDeliveredOrders.map(item => item.id);
                const uniqueIds = allIds.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                });
                return uniqueIds;
            }
        },

        methods: {
            currentProduct(productId) {
                return this.allProducts.filter(product => (
                    Number(product.id) === Number(productId)
                ))[0];
            },

            totalAmount(orderId) {
                return this.allDeliveredOrders.filter(order => order.id === orderId)[0].total;
            },

            delivered(orderId) {
                return Number(this.allDeliveredOrders.filter(order => order.id === orderId)[0].delivered);
            }
        },

        mounted() {
            this.$store.dispatch('getOrderedProducts');
        }
    }
</script>

<style lang="scss" scoped>
    .co-ordered {
        &__ul {
            padding-top: 15px;
        }

        &__li {
            border-bottom: 1px solid $gray-light;
            padding: 5px 0 5px;
        }

        &__name {
            font-size: 20px;
            text-decoration: underline;
        }

        &__amount, &__count {
            color: $gray-dark;
            font-size: 15px;
        }

        &__delivered {
            float: right;
        }
    }
</style>