<template>
    <div class="o-layout co-order-products">
        <h1 class="u-h1">Order products</h1>

        <ul
                v-if="allProducts.length > 0"
                v-for="product in allProducts"
                :key="product.id"
        >
            <li class="co-order-products__li">
                <div class="co-order-products__product-info">
                    <h2 class="u-h2"><span class="co-order-products__product-title">{{product.name}}</span> <small class="co-order-products__amount">{{product.amount}}L</small></h2>
                    <p class="co-order-products__price">{{product.price}} kn</p>
                </div>
                <button
                        class="c-btn c-btn--primary co-order-products__btn-add"
                >
                    Add</button>
                <div class="u-clear"></div>
            </li>
        </ul>

        <v-modal/>
    </div>
</template>

<script>
    export default {
        name: 'OrderProducts',

        computed: {
            allProducts() {
                return this.$store.state.allProducts;
            }
        },

        created() {
            this.$store.dispatch('getAllProducts');
            console.log('hello');
        },

        mounted() {
            console.log('hello');
        }
    }
</script>

<style lang="scss" scoped>
    .co-order-products {

        .u-h2 {
            margin-bottom: 3px;
            font-size: 18px;
        }

        &__li {
            border-bottom: 1px solid $gray-light;
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
    }
</style>
