<template>
  <div class="page">
    <Discussions
      :value="discussions"
    />
    <div class="conversation">
      <template
        v-if="messages && messages.length"
      >
        <MessageList
          :value="messages"
          :scrollTo="$route.hash.slice(1)"
        />
        <InputSendMessage
          v-model="message"
          :sending="sendingMessage"
          @send="handlerSendMessage"
        />
      </template>
      <template
        v-else-if="discussionId"
      >
        <div class="loader"></div>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Discussions from '@/components/Discussions'
  import MessageList from '@/components/MessageList'
  import InputSendMessage from '@/components/InputSendMessage'

  export default {
    props: ['discussionId'],
    components: {
      Discussions,
      MessageList,
      InputSendMessage
    },
    data: () => ({
      message: ''
    }),
    computed: {
      ...mapState([
        'discussions',
        'messages',
        'sendingMessage'
      ]),
    },
    created() {
      this.getDiscussions()
      if (this.discussionId) {
        this.getMessages(this.discussionId)
      }
    },
    watch: {
      $route(to, from) {
        const isSimilarPath = to.path == from.path
        if (this.discussionId && !isSimilarPath) {
          this.getMessages(this.discussionId)
        }
      }
    },
    methods: {
      ...mapActions([
        'getDiscussions',
        'getMessages',
        'sendMessage'
      ]),
      handlerSendMessage() {
        if (this.message.trim()) {
          const params = {
            discussionId: this.discussionId,
            message: {
              author: 'support',
              created: this.$moment().format('YYYY-MM-DD HH:mm'),
              text: this.message
            }
          }
          this.sendMessage(params)
          this.message = ''
          location.hash = ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .page {
    height: 100%;
   .conversation {
      position: relative;
      z-index: 100;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      min-height: 100%;
      padding-top: 50px;
      padding-bottom: 50px;
      background-color: #FFF;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, .1);
    }
    .input-send-message {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 200;
      min-width: 300px;
      width: 100%;
    }
    .loader {
      position: absolute;
      top: calc(50% - 24px);
      left: calc(50% - 24px);
      width: 48px;
      height: 48px;
    }
    .loader::after {
      content: " ";
      display: block;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 6px solid transparent;
      border-top-color: #398BFF;
      border-bottom-color: #398BFF;
      animation: dual-ring 1.2s linear infinite;
    }
    @keyframes dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  @media (min-width: 1200px) {
    .page {
      padding-left: 300px;
      .conversation {
        z-index: 300;
        padding-top: 0;
        padding-bottom: 80px;
      }
      .message-list {
        max-width: 900px;
      }
      .input-send-message {
        z-index: 300;
        left: 300px;
        width: calc(100% - 300px);
      }
    }
  }
</style>