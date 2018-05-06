<template>
    <div class="co-ordered">
        <ul
                class="co-ordered__ul"
                v-if="deliveredOrdersIds.length > 0"
                v-for="orderId in deliveredOrdersIds"
        >
            <li
                    class="co-ordered__li"
                    v-for="product in ordered"
                    :key="product.orderProductsId"
                    v-if="orderId === product.orderId"
            >
                <span class="co-ordered__name">{{product.productName}}</span>
                <span class="co-ordered__amount">{{product.productAmount}}L</span>
                <span>{{(Number(product.productPrice) * Number(product.productCount)).toFixed(2)}} kn</span>
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
    // helpers
    import {LocalStorage} from "../../../helpers/LocalStorage";

    export default {
        name: 'Ordered',

        computed: {
            ordered() {
                return this.$store.state.cart.delivered;
            },

            deliveredOrdersIds() {
                if (!this.ordered) return [];
                const allIds = this.ordered.map(item => item.orderId);
                const uniqueIds = allIds.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                });
                return uniqueIds;
            }
        },

        methods: {
            totalAmount(orderId) {
                return this.ordered.filter(order => order.orderId === orderId)[0].total;
            },

            delivered(orderId) {
                return Number(this.ordered.filter(order => order.orderId === orderId)[0].delivered);
            }
        },

        created() {
            console.log({
                tableId: this.$store.state,
                token: this.$store.state
            });
            this.$store.dispatch('getOrderedProducts', {
                tableId: this.$route.query.t,
                token: LocalStorage.getInstance().setItem().token
            });
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