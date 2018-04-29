<template>
    <div class="co-header">
        <h2
                class="u-h2 co-header__nav-item"
                :class="{'is-active': currentRouteName === 'OrderProducts'}"
                @click="goToOrder"
        >
            Order
        </h2>
        <h2
                class="u-h2 co-header__nav-item"
                :class="{'is-active': currentRouteName === 'Cart'}"
                @click="goToCart"
        >
            <font-awesome-icon :icon="icon.faShoppingCart"/>
        </h2>

        <div class="u-clear"></div>
    </div>
</template>

<script>
    // plugins
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import {faShoppingCart} from '@fortawesome/fontawesome-free-solid';

    export default {
        name: 'AppHeader',

        computed: {
            icon() {
                return {
                    faShoppingCart
                }
            },

            currentRouteName() {
                return this.$route.name;
            }
        },

        methods: {
            goToOrder() {
                this.$router.push({name: 'OrderProducts', query: {t: this.$store.state.tableId}});
            },

            goToCart() {
                this.$router.push({name: 'Cart', query: {t: this.$store.state.tableId}});
            }
        },

        components: {
            FontAwesomeIcon
        }
    }
</script>

<style lang="scss" scoped>
    .co-header {
        width: 100vw;
        height: 40px;
        background-color: $blue-dark;

        &__nav-item {
            padding: 0px 10px 0;
            height: 100%;
            line-height: 2.6;
            margin: 0;
            border-right: 1px solid $gray-light;
            float: left;
            text-transform: uppercase;
            font-size: 15px;
            color: $white;
        }

        .u-h2 {
            &.is-active {
                background-color: $blue-dark-dark;
            }
        }
    }
</style>