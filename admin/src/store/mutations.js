export const mutations = {
    updateAllTables(state, tables) {
        tables.forEach(table => {
            if (table.active === 1) {
                state.connectedTables.push(table.id);
            }
            else {
                state.tables = tables;
            }
        });
    },

    setTryTableConnectionTables(state, tableId) {
        const indexOf = state.connectedTables.indexOf(tableId);
        if (indexOf > -1) {
            state.connectedTables.splice(indexOf, 1);
        }
        state.tryTableConnectionTables.push(tableId);
    },

    setConnectedTables(state, tableId) {
        const indexOf = state.tryTableConnectionTables.indexOf(tableId);
        if (indexOf > -1) {
            state.tryTableConnectionTables.splice(indexOf, 1);
        }
        state.connectedTables.push(tableId);
    },

    setOrderedProducts(state, orderedProducts) {
        state.orderedProducts = orderedProducts;
    },

    setAllProducts(state, allProducts) {
        state.allProducts = allProducts;
    }
};