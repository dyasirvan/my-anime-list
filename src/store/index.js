import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    animeRecommendations: [],
    animeNow: [],
    selectedAnime: null
  },
  getters: {
    getAnimeRecommendations: state => state.animeRecommendations,
    getAnimeNow: state => state.animeNow,
    getSelectedAnime: state => state.selectedAnime
  },
  mutations: {
    setAnimeRecommendations(state, animeRecommendations) {
      state.animeRecommendations = animeRecommendations;
    },
    setAnimeNow(state, animeNow) {
      state.animeNow = animeNow;
    },
    setSelectedAnime(state, selectedAnime) {
      state.selectedAnime = selectedAnime;
    }
  },
  actions: {
    fetchAnimeRecommendations: async ({ commit }) => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/recommendations/anime');
        commit('setAnimeRecommendations', response.data.data);
      } catch (error) {
        console.error(error);
      }
    },
    fetchAnimeNow: async ({ commit }) => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/seasons/now');
        commit('setAnimeNow', response.data.data);
      } catch (error) {
        console.error(error);
      }
    },
    fetchSelectedAnime: async ({ commit }, id) => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        commit('setSelectedAnime', response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

  },
  modules: {
  }
})
