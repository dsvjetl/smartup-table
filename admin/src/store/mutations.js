export const mutations = {
    updateAllTables(state, tables) {
        state.tables = tables;
    },

    setTryTableConnectionTables(state, tableId) {
        state.tryTableConnectionTables.push(tableId);
    }
};