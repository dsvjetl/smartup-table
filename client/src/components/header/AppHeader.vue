<template>
    <div class="co-header">
        <h2 class="u-h2 co-header__nav-item">Order</h2>

        <div class="u-clear"></div>
    </div>
</template>

<script>
    export default {
        name: 'AppHeader'
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
            line-height: 2.5;
            margin: 0;
            border-right: 1px solid $gray-light;
            float: left;
            text-transform: uppercase;
            font-size: 15px;
            color: $white;
        }
    }
</style>