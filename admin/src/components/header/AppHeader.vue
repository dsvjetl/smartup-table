<template>
    <header class="co-header">
        <a
                class="u-h2 co-header__link"
                @click="linkClicked('tables')"
        >Tables</a>
    </header>
</template>

<script>
    export default {
        name: 'AppHeader',

        methods: {
            linkClicked(mode) {
                switch(mode) {
                    case 'tables':
                        this.$router.push({name: 'Tables'});
                        break;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .co-header {
        background-color: $blue-dark;
        width: 100vw;
        padding: 5px 5%;

        &__link {
            border-right: 1px solid $white;
            padding: 0 15px;
            font-weight: 100;
            color: $white;
            transition: color .2s ease-in-out;

            &:hover {
                cursor: pointer;
                color: $blue-dark-dark;
            }
        }
    }
</style>