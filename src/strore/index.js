import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    museums: [],
    totalPages: 1,
    perPage: 5,
    currentPage: 1,
    sortBy: 'name',
    sortDesc: false,
    sortOptions: [
      { value: 5, name: '5' },
      { value: 10, name: '10' },
      { value: 15, name: '15' },
    ]
  },
  mutations: {
    SET_MUSEUMS(state, museums) {
      state.museums = museums;
    },
    SET_TOTAL_PAGES(state, totalPages) {
      state.totalPages = totalPages;
    },
    SET_CURRENT_PAGE(state, currentPage) {
      state.currentPage = currentPage;
    },
    SET_SORT_BY(state, sortBy) {
      state.sortBy = sortBy;
    },
    SET_SORT_DESC(state, sortDesc) {
      state.sortDesc = sortDesc;
    },
    SET_PER_PAGE(state, perPage) {
      state.perPage = perPage;
    }
  },
  actions: {
    async fetchMuseums({ commit, state }) {
      try {
        const response = await axios.get(`https://developer3.elros.info/api/v1/museums/?page=${state.currentPage}&page_size=${state.perPage}&ordering=${state.sortDesc ? '-' : ''}${state.sortBy}`);
        commit('SET_MUSEUMS', response.data.results);
        commit('SET_TOTAL_PAGES', Math.ceil(response.data.count / state.perPage));
      } catch (error) {
        console.error(error);
      }
    },
    deleteMuseum({ dispatch }, museum) {
      axios.delete(`https://developer3.elros.info/api/v1/museums/${museum.id}/`)
        .then(() => {
          dispatch('fetchMuseums');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
});
