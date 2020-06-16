import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isLoadingResult: false, 
  },
  mutations: {
    toggleIsLoadingResult(state) {
      state.isLoadingResult = !state.isLoadingResult;
    }
  },
  getters: {
    isLoadingResult: (state) => {
      return state.isLoadingResult;
    }
  }
});