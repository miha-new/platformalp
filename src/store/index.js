import Vue from 'vue';
import Vuex from 'vuex';

import discussions from '@/assets/api/discussions.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    discussions: [],
    messages: [],
  },
  mutations: {
    setDiscussions(state, options) {
      state.discussions.splice(...options);
    },
    setMessages(state, items) {
      state.messages = items;
    },
  },
  actions: {
    async getDiscussions({ state, commit }) {
      const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (discussions) {
            resolve({ items: discussions });
          } else {
            reject(new Error('Не удалось загрузить "discussions"'));
          }
        }, 2000);
      });
      commit('setDiscussions', [0, state.discussions.length, ...data.items]);
    },
    async getMessages({ state, commit }, discussionId) {
      commit('setMessages', []);
      const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const discussion = state.discussions.find((item) => discussionId === item.id);
          if (discussion) {
            resolve({ items: discussion.parts });
          } else {
            reject(new Error('Не удалось загрузить "messages"'));
          }
        }, 2000);
      });
      commit('setMessages', data.items);
    },
    async sendMessage({ state, commit }, { discussionId, message }) {
      const options = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = state.discussions.findIndex((item) => discussionId === item.id);
          const discussion = { ...state.discussions[index] };
          const ids = state.discussions[index].parts.map((item) => item.id);
          const id = ids.length ? Math.max(...ids) + 1 : 0;
          if (message) {
            discussion.parts.push({ id, ...message });
            resolve([index, 1, discussion]);
          } else {
            reject(new Error('Не удалось отправить "message"'));
          }
        }, 2000);
      });
      commit('setDiscussions', options);
      return false;
    },
  },
});
