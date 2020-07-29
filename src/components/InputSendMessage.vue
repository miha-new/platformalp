<template>
  <div class="input-send-message">
    <input
      type="text"
      name="message"
      class="input-control"
      placeholder="Введите текст..."
      autocomplete="off"
      :value="value"
      :disabled="sending"
      @input="inputMessage"
      @keydown.enter="sendMessage"
    />
    <button
      class="btn-send"
      :disabled="sending"
      @click="sendMessage"
    >
      <img
        v-if="!sending"
        class="icon"
        src="@/assets/svg/icon-send.svg"
        alt="Send"
      >
      <div
        v-else
        class="loader"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    sending: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    inputMessage({ target }) {
      this.$emit('input', target.value);
    },
    sendMessage() {
      this.$emit('send');
    },
  },
};
</script>

<style scoped lang="scss">
  .input-send-message {
    position: relative;
    display: flex;
    .input-control {
      flex: 1 1 auto;
      display: block;
      width: 100%;
      height: 50px;
      padding: 14px 20px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: #475453;
      background-color: #FFF;
      border: 1px solid transparent;
      border-top-color: #E9EDF2;
      &:focus {
        outline: 0;
      }
      &::placeholder {
        color: #7D8790;
      }
      &:disabled {
        pointer-events: none;
        background-color: #F3F6F8;
      }
    }
    .btn-send {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 50px;
      max-width: 50px;
      height: 50px;
      padding: 0;
      background-color: #398BFF;
      color: #FFF;
      border: none;
      user-select: none;
      cursor: pointer;
      transition: color .15s ease-in-out, background-color .15s ease-in-out;
      &:focus {
        outline: 0;
      }
      &:disabled {
        pointer-events: none
      }
    }
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    .loader {
      display: inline-block;
      width: 20px;
      height: 20px;
      &::after {
        content: " ";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #FFF;
        border-bottom-color: #FFF;
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
  }
  @media (min-width: 1200px) {
    .input-send-message {
      .input-control {
        height: 80px;
        padding: 30px;
      }
      .btn-send {
        flex: 0 0 80px;
        max-width: 80px;
        height: 80px;
      }
      .icon {
        width: 24px;
        height: 24px;
      }
      .loader {
        width: 24px;
        height: 24px;
        &::after {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
</style>
