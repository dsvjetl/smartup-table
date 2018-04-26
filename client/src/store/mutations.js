export const mutations = {
    connectToTable(state, {status}) {
        state.connected = status;
    },

    setAllProducts(state, allProducts) {
        state.allProducts = allProducts;
    }
};