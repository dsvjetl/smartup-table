<template>
    <div class="co-tables o-layout">
        <tables/>
    </div>
</template>

<script>
    // components
    import Tables from '@/components/pages/Tables/Tables';

    export default {
        name: 'TablesIndex',

        components: {
            Tables
        }
    }
</script>

<style lang="scss" scoped>
    .co-tables {
        padding-top: 20px;
    }
</style>