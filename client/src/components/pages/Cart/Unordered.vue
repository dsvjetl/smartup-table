<template>
    <div class="co-unordered">
        <div v-if="unorderedProducts.length > 0">
            <ul class="co-cart__ul">
                <li
                        v-for="product in unorderedProducts"
                        :key="product.id"
                        class="co-cart__li"
                >
                    <span class="co-cart__name">{{product.name}}</span>
                    <span class="co-cart__amount">{{product.amount}}L</span>
                    <span>{{Number(product.productPrice).toFixed(2)}} kn</span>
                    <span class="co-cart__count">(x {{product.count}})</span>
                </li>
                <li class="co-cart__li">
                    Total: <span class="co-cart__total-price">{{unorderedProductsTotal}} kn</span>
                </li>
            </ul>
            <div class="co-cart__buy-buttons">
                <button
                        class="c-btn c-btn--primary co-cart__btn-dismiss"
                        @click="dismissOrderedProducts"
                >
                    Dismiss
                    <font-awesome-icon :icon="icon.faTrashAlt"/>
                </button>
                <button
                        class="c-btn c-btn--primary  co-cart__btn-buy"
                        @click="order"
                >
                    Order
                    <font-awesome-icon :icon="icon.faMoneyBillAlt"/>
                </button>
            </div>
        </div>
        <h1
                class="u-h1 co-cart__no-products"
                v-else-if="orderSuccessful === false"
        >
            There are no products ordered
        </h1>

        <h1
                class="u-h1 co-cart__no-products"
                v-if="orderSuccessful"
        >
            Order successful!
            <font-awesome-icon :icon="icon.faCheckCircle"/>
        </h1>
    </div>
</template>

<script>
    // plugins
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import {faTrashAlt, faMoneyBillAlt, faCheckCircle} from '@fortawesome/fontawesome-free-solid';

    export default {
        name: 'Unordered',

        data() {
            return {
                orderSuccessful: false
            }
        },

        computed: {
            unorderedProducts() {
                return this.$store.state.cart.undelivered;
            },

            unorderedProductsTotal() {
                let total = 0;
                this.unorderedProducts.forEach(product => {
                     total += product.productPrice;
                });
                return total.toFixed(2);
            },

            icon() {
                return {
                    faTrashAlt,
                    faMoneyBillAlt,
                    faCheckCircle
                }
            },
        },

        methods: {
            dismissOrderedProducts() {
                this.$store.commit('deleteAllCartUndelivered');
            },

            order() {
                this.$store.dispatch('makeOrder', this.unorderedProductsTotal);
                this.$store.commit('deleteAllCartUndelivered');
                this.orderSuccessful = true;
                setTimeout(() => {
                    this.orderSuccessful = false;
                }, 3000)
            }
        },

        components: {
            FontAwesomeIcon
        }
    }
</script>

<style lang="scss" scoped>
    .co-cart {
        &__ul {
            padding-top: 15px;
        }

        &__li {
            border-bottom: 1px solid $gray-light;
            padding: 5px 0 5px;
        }

        span {
            padding-right: 3px;
        }

        &__name {
            font-size: 20px;
            text-decoration: underline;
        }

        &__amount, &__count {
            color: $gray-dark;
            font-size: 15px;
        }

        &__buy-buttons {
            padding: 20px 5px 5px;
            display: flex;
            justify-content: space-between;

            .c-btn {
                width: 48%;
            }
        }

        &__btn-dismiss {
            background-color: $gray-dark;
        }

        &__btn-buy {
            background-color: lightgreen;
        }

        &__total-price {
            color: $blue-dark;
            text-decoration: underline;
        }
    }
</style>
