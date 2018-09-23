<template>
    <div class="co-ordered">
        <ul
                class="co-ordered__ul"
                v-if="deliveredOrdersIds.length > 0"
                v-for="orderId in deliveredOrdersIds"
                :key="orderId"
                :class="{'is-ordered': delivered(orderId)}"
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
            <li class="co-ordered__li-info">
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
                return this.$store.state.cart.delivered.reverse();
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
            this.$store.dispatch('getOrderedProducts', {
                tableId: this.$store.state.tableId,
                token: LocalStorage.getInstance().setItem().token
            });
        }
    }
</script>

<style lang="scss" scoped>
    .co-ordered {
        &__ul {
            margin-top: 20px;
            padding-left: 4px;
            /*border-bottom: 2px solid $blue-dark;*/
            border-left: 2px solid $blue-dark;

            &.is-ordered {
                border-left: 2px solid green;
            }
        }

        &__li {
            border-bottom: 1px solid $gray-light;
            padding: 5px 0 5px;
        }

        &__li-info {
            padding: 3px 0 5px;
        }

        &__name {
            font-size: 20px;
        }

        &__amount, &__count {
            color: $gray-dark;
            font-size: 15px;
        }

        &__delivered {
            float: right;

            .is-ordered & {
                color: green;
            }
        }
    }
</style>