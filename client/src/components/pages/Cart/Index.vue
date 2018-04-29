<template>
    <div class="co-cart o-layout">
        <div
                class="co-cart__nav"
                v-if="unorderedProducts.length > 0"
        >
            <button
                    class="c-btn c-btn--primary"
                    :class="{'is-active': currentComponent === 'unordered'}"
                    @click="goToUnordered"
            >Unordered</button>
            <button
                    class="c-btn c-btn--primary"
                    :class="{'is-active': currentComponent === 'ordered'}"
                    @click="goToOrdered"
            >Ordered</button>
        </div>
        <component :is="currentComponent"></component>
    </div>
</template>

<script>
    // components
    import Unordered from '@/components/pages/Cart/Unordered';
    import Ordered from '@/components/pages/Cart/Ordered';

    export default {
        name: 'CartIndex',

        data() {
            return {
                currentComponent: this.$store.state.cart.undelivered.length > 0 ? 'unordered' : 'ordered'
            }
        },

        methods: {
            goToOrdered() {
                this.currentComponent = 'ordered';
            },

            goToUnordered() {
                this.currentComponent = 'unordered';
            }
        },

        computed: {
            unorderedProducts() {
                return this.$store.state.cart.undelivered;
            }
        },

        components: {
            Unordered,
            Ordered
        }
    }
</script>

<style lang="scss" scoped>
    .co-cart {
        &__nav {
            display: flex;
            padding-top: 15px;
            justify-content: space-between;
            .c-btn {
                /*flex: 1;*/
                width: 48%;
                border-radius: 0;

                &.is-active {
                    background-color: $blue-dark-dark;
                }
            }
        }
    }
</style>
