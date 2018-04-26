<template>
    <div class="co-order-modal">
        <div class="co-order-modal__modal">
            <h2 class="u-h2">MODAL</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OrderModal'
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
            padding: 10px;
            background-color: $blue-light;
            margin: auto;
            border-radius: 5px;
        }
    }
</style>