<template>
    <div class="o-layout co-order-products">
        <ul
                class="co-order-products__ul"
                v-if="allProducts.length > 0"
        >
            <li
                    class="co-order-products__li"
                    v-for="product in allProducts"
                    :key="product.id"
                    :class="{'is-ordered': cartUndeliveredIds.includes(product.id)}"
            >
                <div class="co-order-products__product-info">
                    <h2 class="u-h2"><span class="co-order-products__product-title">{{product.name}}</span>
                        <small class="co-order-products__amount">{{product.amount}}L</small>
                    </h2>
                    <p class="co-order-products__price">
                        {{getProductPrice(product.id) ? getProductPrice(product.id) : product.price}} kn
                        {{getProductCount(product.id)}}
                    </p>
                </div>
                <button
                        class="c-btn c-btn--primary co-order-products__btn-add"
                        @click="openModal(product)"
                >
                    {{cartUndeliveredIds.includes(product.id) ? 'Update' : 'Add'}}
                </button>
                <button
                        v-if="cartUndeliveredIds.includes(product.id)"
                        class="co-order-products__btn-remove c-btn c-btn--primary"
                        @click="removeProduct(product.id)"
                >
                    Remove
                </button>
                <div class="u-clear"></div>
            </li>
        </ul>

        <div
                class="co-order-products__order-wrapper"
                v-if="cartUndelivered.length > 0"
        >
            <button
                    class="c-btn c-btn--primary"
                    @click="OrderChosenProducts"
            >
                <span>Order your products</span>
                <font-awesome-icon :icon="icon.faShoppingCart"/>
            </button>
        </div>

        <v-modal
                v-if="modalOpen"
                :product="product"
                @closeModal="closeModal"
        />
    </div>
</template>

<script>
    // plugins
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import {faShoppingCart} from '@fortawesome/fontawesome-free-solid';

    export default {
        name: 'OrderProducts',

        data() {
            return {
                modalOpen: false,
                product: null
            }
        },

        computed: {
            icon() {
                return {
                    faShoppingCart
                }
            },

            allProducts() {
                return this.$store.state.allProducts;
            },

            cartUndeliveredIds() {
                return this.$store.state.cart.undelivered.map(item => item.id);
            },

            cartUndelivered() {
                return this.$store.state.cart.undelivered;
            }
        },

        methods: {
            openModal(product) {
                this.product = product;
                this.modalOpen = true;
            },

            closeModal() {
                this.modalOpen = false;
            },

            removeProduct(productId) {
                this.$store.commit('removeCartUndelivered', productId);
            },

            getProductCount(id) {
                const product = this.$store.state.cart.undelivered.length > 0 ?
                    this.$store.state.cart.undelivered.filter(item => item.id === id)[0] :
                    '';
                return typeof product === 'object' ? `| x${product.count}` : '';
            },

            getProductPrice(id) {
                const product = this.$store.state.cart.undelivered.length > 0 ?
                    this.$store.state.cart.undelivered.filter(item => item.id === id)[0] :
                    false;
                return product ? Number(product.productPrice).toFixed(2) : false;
            },

            OrderChosenProducts() {
                this.$router.push({name: 'Cart', query: {t: this.$store.state.tableId}});
            }
        },

        created() {
            this.$store.dispatch('getAllProducts');
            console.log('hello');
        },

        mounted() {
            console.log('hello');
        },

        components: {
            FontAwesomeIcon
        }
    }
</script>

<style lang="scss" scoped>
    .co-order-products {

        .u-h2 {
            margin-bottom: 3px;
            font-size: 18px;
            margin-top: 3px;
        }

        &__ul {
            padding: 20px 0 50px;
        }

        &__li {
            border-bottom: 1px solid $gray-light;
            padding: 5px;
            margin: 0 0 5px;
        }

        &__product-info {
            float: left;
        }

        &__amount {
            font-size: 15px;
            color: #000;
        }

        &__product-title {
            color: $blue-dark;
        }

        &__price {
            margin: 0 0 5px;
            color: #000;
            font-size: 12px;
        }

        &__btn-add {
            margin-top: 15px;
            float: right;
        }

        &__btn-remove {
            margin-top: 15px;
            float: right;
            margin-right: 3px;
            background-color: $gray-dark;
        }

        &__order-wrapper {
            position: fixed;
            bottom: 10px;
            right: 5%;
            left: 5%;
            border-radius: 5px;

            .c-btn {
                width: 100%;
                border: 2px solid green;
                font-size: 15px;
            }
        }

        .is-ordered {
            background-color: $gray-light;
            border-radius: 5px;
        }
    }
</style>
