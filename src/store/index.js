import Vue from 'vue'
import Vuex from 'vuex'

import discussions from '@/assets/api/discussions.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    discussions: [],
    messages: [],
    sendingMessage: false
  },
  mutations: {
    setDiscussions(state, options) {
      state.discussions.splice(...options)
    },
    setMessages(state, items) {
      state.messages = items
    },
    setSendingMessage(state, value) {
      state.sendingMessage = value
    }
  },
  actions: {
    async getDiscussions({commit}) {
      console.log('getDiscussions')
      const items = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(discussions)
        }, 2000)
      })
      commit('setDiscussions', [0, 0, ...items])
    },
    async getMessages({state, commit}, discussionId) {
      console.log('getMessages')
      commit('setMessages', [])
      const items = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const discussion = state.discussions.find(item => discussionId == item.id)
          if (discussion) {
            resolve(discussion.parts)
          } else {
            reject(null)
          }
        }, 2000)
      })
      if (items) {
        commit('setMessages', items)
      }
    },
    async sendMessage({state, commit}, {discussionId, message}) {
      commit('setSendingMessage', true)
      const options = await new Promise((resolve) => {
        setTimeout(() => {
          const index = state.discussions.findIndex(item => discussionId == item.id)
          const discussion = Object.assign({}, state.discussions[index])
          const ids = state.discussions[index].parts.map(item => item.id)
          const id = ids.length ? Math.max(...ids) + 1 : 0
          discussion.parts.push({id, ...message})
          resolve([index, 1, discussion])
        }, 2000)
      })
      commit('setSendingMessage', false)
      commit('setDiscussions', options)
    }
  }
})