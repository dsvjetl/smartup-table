<template>
    <div
            class="co-order-modal"
            @click.self="closeModal"
    >
        <div class="co-order-modal__modal">
            <button
                    class="co-order-modal__btn-close"
                    @click="closeModal"
            >
                <font-awesome-icon :icon="icon.faWindowClose"/>
            </button>

            <h2 class="u-h2 co-order-modal__name">{{product.name}} <span class="co-order-modal__amount-def">{{product.amount}}L</span></h2>
            <p class="co-order-modal__price">{{productPrice.toFixed(2)}} kn</p>

            <div>

                <span class="co-order-modal__amount">X {{amount}}</span>

                <button
                        class="c-btn c-btn--primary co-order-modal__btn-down"
                        @click="IncDecAmount('dec')"
                >
                    <font-awesome-icon :icon="icon.faAngleDown"/>
                </button>
                <button
                        class="c-btn c-btn--primary co-order-modal__btn-up"
                        @click="IncDecAmount('inc')"
                >
                    <font-awesome-icon :icon="icon.faAngleUp"/>
                </button>
            </div>

            <div class="co-order-modal__ordering">
                <button
                    class="c-btn c-btn--primary co-order-modal__btn-order"
                    @click="setCartUndelivered(product)"
                >
                    <font-awesome-icon class="co-order-modal__order-icon" :icon="icon.faShoppingCart"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
    import {faAngleDown, faAngleUp, faShoppingCart, faWindowClose} from '@fortawesome/fontawesome-free-solid';

    export default {
        name: 'OrderModal',

        data() {
            return {
                amount: 1,
                productPrice: Number(this.product.price),
                defaultProductPrice: null
            }
        },

        computed: {
            icon() {
                return {
                    faAngleUp,
                    faAngleDown,
                    faShoppingCart,
                    faWindowClose
                }
            },

            cartUndeliveredIds() {
                return this.$store.state.cart.undelivered.map(item => item.id);
            },

            cartUndelivered() {
                return this.$store.state.cart.undelivered;
            }
        },

        props: {
            product: Object
        },

        methods: {
            closeModal() {
                this.$emit('closeModal');
            },

            IncDecAmount(mode) {
                if (mode === 'inc') {
                    this.amount++;
                    this.productPrice += Number(this.product.price);
                }
                else {
                    if (this.amount > 1) {
                        this.amount--;
                        this.productPrice -= Number(this.product.price);
                    }
                }
            },

            setCartUndelivered(product) {
                const undeliveredProduct = product;
                undeliveredProduct.count = this.amount;
                undeliveredProduct.productPrice = this.productPrice;
                this.$store.commit('setCartUndelivered', product);
                this.closeModal();
            }
        },

        mounted() {
            if (this.cartUndeliveredIds.includes(this.product.id)) {
                const wantedProduct = this.cartUndelivered.filter(product => product.id === this.product.id)[0];
                console.log(wantedProduct);
                this.productPrice = Number(wantedProduct.price);
                this.amount = Number(wantedProduct.count);
                this.productPrice = wantedProduct.productPrice ? Number(wantedProduct.productPrice) : Number(this.product.price);
            }
        },

        components: {
            FontAwesomeIcon
        }
    }
</script>

<style lang="scss" scoped>
    .co-order-modal {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, .5);
        display: flex;

        &__modal {
            padding: 10px 15px;
            background-color: $blue-light;
            margin: auto;
            border-radius: 5px;
            position: relative;
        }

        &__btn-close {
            position: absolute;
            top: -35px;
            right: -5px;
            font-size: 25px;
            color: $white;
        }

        &__name {
            margin-top: 5px;
            text-decoration: underline;
            text-align: center;
            color: $white;
        }

        &__price {
            color: $white;
            text-align: center;
            padding-bottom: 20px;
        }

        &__amount {
            padding-right: 20px;
        }

        &__amount-def {
            color: $gray-light;
        }

        &__btn-down {
            margin-right: 15px;
        }

        .c-btn {
            transition: transform .3s ease-in-out;

            &:active {
                transform: scale(1.1);
            }
        }

        &__ordering {
            margin-top: 15px;
            padding-top: 15px;
            text-align: center;
            border-top: 1px solid $gray-light;
        }

        &__btn-order {
            width: 100%;
        }

        &__order-icon {
            font-size: 25px;
        }
    }
</style>