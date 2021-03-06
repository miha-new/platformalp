<template>
  <div class="message-list">
    <div
      v-for="item in value"
      :key="item.id"
      :id="anchorName(item.id)"
      class="message"
      :class="{
        anchor: isAnchor(item.id),
        user: isUser(item.author)
      }"
    >
      <div class="message-body">
        <div class="message-text">
          {{item.text}}
        </div>
      </div>
      <div class="message-foot">
        <div class="message-author">
          {{item.author}}
        </div>
        <div class="message-created">
          {{dateFormat(item.created, 'YYYY-MM-DD HH:mm', 'DD.MM.YYYY HH:mm')}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
    scrollTo: {
      type: String,
    },
  },
  computed: {
    scrollToFinal() {
      if (this.value.length) {
        return `msg-${this.value[this.value.length - 1].id}`;
      }
      return undefined;
    },
  },
  watch: {
    value() {
      this.goToMessage();
    },
    scrollTo() {
      if (this.value.length) {
        this.goToMessage();
      }
    },
  },
  mounted() {
    this.goToMessage();
  },
  methods: {
    anchorName(id) {
      return `msg-${id}`;
    },
    isAnchor(id) {
      if (this.scrollTo) {
        return this.scrollTo === this.anchorName(id);
      }
      return undefined;
    },
    isUser(author) {
      return this.value[0].author === author;
    },
    goToMessage() {
      this.$nextTick(() => {
        const id = this.scrollTo ? this.scrollTo : this.scrollToFinal;
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView();
        }
      });
    },
    dateFormat(value, from, to) {
      return this.$moment(value, from).format(to);
    },
  },
};
</script>

<style scoped lang="scss">
  .message-list {
    width: 100%;
    padding: 0 20px;
    margin: 5px 0;
    background-color: #FFF;
    .message {
      padding-top: 65px;
      padding-bottom: 15px;
      margin-top: -50px;
      &.anchor {
        .message-text {
          box-shadow: 0 0 10px #398BFF;
        }
      }
      &.user {
        margin-left: auto;
        text-align: right;
        .message-foot {
          justify-content: flex-end;
        }
        .message-text {
          margin-left: auto;
          background-color: #E9F5F4;
          border-radius: 8px 8px 0 8px;
        }
      }
    }
    .message-body {
      display: flex;
    }
    .message-foot {
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .message-text {
      flex: 0 0 auto;
      max-width: 100%;
      padding: 10px 15px;
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 20px;
      color: #475453;
      background-color: #F6F7F9;
      border-radius: 8px 8px 8px 0;
    }
    .message-author {
      margin-right: 10px;
      font-size: 13px;
      line-height: 18px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #000;
    }
    .message-created {
      font-size: 10px;
      line-height: 14px;
      color: #B7C0C8;
    }
  }
  @media (min-width: 1200px) {
    .message-list {
      padding: 0 30px;
      margin: 10px 0;
      .message {
        max-width: 60%;
        padding-top: 15px;
        margin-top: 0;
      }
      .message-text {
        padding: 15px 20px;
      }
    }
  }
</style>
