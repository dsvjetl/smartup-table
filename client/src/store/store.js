import Vuex from 'vuex';
import Vue from 'vue';
import {state} from "./state";
import {actions} from "./actions";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state,
    actions
});