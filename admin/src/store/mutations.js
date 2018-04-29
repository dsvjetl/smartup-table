export const mutations = {
    updateAllTables(state, tables) {
        state.tables = tables;
    },

    setTryTableConnectionTables(state, tableId) {
        const indexOf = state.connectedTables.indexOf(tableId);
        if (indexOf > -1) {
            state.connectedTables.splice(indexOf, 1);
        }
        state.tryTableConnectionTables.push(tableId);
    },

    setConnectecTables(state, tableId) {
        const indexOf = state.tryTableConnectionTables.indexOf(tableId);
        if (indexOf > -1) {
            state.tryTableConnectionTables.splice(indexOf, 1);
        }
        state.connectedTables.push(tableId);
    }
};