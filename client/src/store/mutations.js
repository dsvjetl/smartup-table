export const mutations = {
    connectToTable(state, {status, tableId, token}) {
        state.connected = status;
        state.tableId = tableId;
        state.token = token;
    },

    setAllProducts(state, allProducts) {
        state.allProducts = allProducts;
    },

    setCartUndelivered(state, product) {
        let exists = false;
        state.cart.undelivered.forEach((cartProduct, index) => {
            if (cartProduct.id === product.id) {
                state.cart.undelivered.splice(index, 1, product);
                exists = true;
                return;
            }
        });
        if (!exists) {
            state.cart.undelivered.push(product);
        }
    },

    deleteAllCartUndelivered(state) {
          state.cart.undelivered = [];
    },

    removeCartUndelivered(state, productId) {
        state.cart.undelivered.forEach((product, index) => {
            if (product.id === productId) {
                state.cart.undelivered.splice(index, 1);
            }
        });
    },

    updateOrderedProducts(state, ordered) {
        console.log(ordered);
        state.cart.delivered = ordered;
    }
};