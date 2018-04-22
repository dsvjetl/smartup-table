import Vuex from 'vuex';
import Vue from 'vue';
import {actions} from "./actions";
import {state} from "./state";
import {mutations} from "./mutations";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state,
    actions,
    mutations
});