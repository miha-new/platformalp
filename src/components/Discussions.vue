<template>
  <div
    class="discussions"
    :class="{open: open || $route.name === 'home'}"
  >
    <template
      v-if="value.length"
    >
      <div class="discussions-head">
        <div class="discussion-title">
          Все переписки
          <span class="title-count">
            {{value.length}}
          </span>
        </div>
        <button
          v-if="$route.name !== 'home'"
          class="btn-nav"
          @click="open = !open"
        >
          <div class="icon-nav">
            <span></span>
          </div>
        </button>
      </div>
      <div class="discussions-body">
        <div
          class="discussion-nav"
          @click="open = false"
        >
          <router-link
            v-for="item in value"
            :key="item.id"
            :to="`/${item.id}`"
            class="discussion-link"
          >
            <div class="link-head">
              <div class="link-subject">
                {{item.subject}}
              </div>
              <div class="link-created">
                {{dateFormat(item.created, 'YYYY-MM-DD HH:mm', 'D MMMM YYYY')}}
              </div>
            </div>
            <div class="link-body">
              <div class="link-text">
                {{item.parts[0].text}}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    open: false,
  }),
  methods: {
    dateFormat(value, from, to) {
      return this.$moment(value, from).format(to);
    },
  },
};
</script>

<style scoped lang="scss">
  .discussions {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
    min-width: 300px;
    width: 100%;
    height: 50px;
    background-color: #F3F6F8;
    overflow: hidden;
    transition: .15s ease-in-out;
    &:empty {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 300;
      background-repeat: no-repeat;
      background-image: linear-gradient(
                          to bottom,
                          rgba(255, 255, 255, .1) 0% 100%
                        ),
                        linear-gradient(
                          to bottom,
                          #656B77 0% 100%
                        ),
                        linear-gradient(
                          to bottom,
                          rgba(255, 255, 255, .1) 0% 100%
                        ),
                        linear-gradient(
                          to bottom,
                          #D2D8DE 0% 100%
                        ),
                        linear-gradient(
                          to bottom,
                          #E9EDF2 0% 100%
                        ),
                        repeating-linear-gradient(
                          to bottom,
                          transparent 0px 18px,
                          rgba(255, 255, 255, .1) 18px 32px,
                          transparent 32px 70px
                        ),
                        repeating-linear-gradient(
                          to bottom,
                          transparent 0px 18px,
                          #35383D 18px 32px,
                          transparent 32px 70px
                        ),
                        repeating-linear-gradient(
                          to bottom,
                          transparent 0px 18px,
                          rgba(255, 255, 255, .1) 18px 32px,
                          transparent 32px 70px
                        ),
                        repeating-linear-gradient(
                          to bottom,
                          transparent 0px 18px,
                          #B7C0C8 18px 32px,
                          transparent 32px 70px
                        ),
                        repeating-linear-gradient(
                          to bottom,
                          transparent 0px 38px,
                          rgba(255, 255, 255, .1) 38px 52px,
                          transparent 52px 70px
                        ),
                        repeating-linear-gradient(
                          to bottom,
                          transparent 0px 38px,
                          #7D8790 38px 52px,
                          transparent 52px 70px
                        ),
                        repeating-linear-gradient(
                          to bottom,
                          transparent 0px 69px,
                          #E9EDF2 69px 70px
                        );
      background-size: 0px 14px,
                       100px 14px,
                       0px 14px,
                       14px 14px,
                       100% 1px,
                       0px 140px,
                       calc(100% - 137px) 140px,
                       0px 140px,
                       87px 140px,
                       0px 140px,
                       calc(100% - 40px) 140px,
                       100% 140px;
      background-position: 20px 18px,
                           20px 18px,
                           130px 18px,
                           130px 18px,
                           0px 49px,
                           20px 50px,
                           20px 50px,
                           calc(100% - 107px) 50px,
                           calc(100% - 20px) 50px,
                           20px 50px,
                           20px 50px,
                           0px 50px;
      animation: loading 2s linear infinite;
    }
    @keyframes loading {
      0% {
        background-size: 0px 14px,
                         100px 14px,
                         0px 14px,
                         14px 14px,
                         100% 1px,
                         0px 140px,
                         calc(100% - 137px) 140px,
                         0px 140px,
                         87px 140px,
                         0px 140px,
                         calc(100% - 40px) 140px,
                         100% 140px;
        background-position: 20px 18px,
                             20px 18px,
                             130px 18px,
                             130px 18px,
                             20px 49px,
                             20px 50px,
                             20px 50px,
                             calc(100% - 107px) 50px,
                             calc(100% - 20px) 50px,
                             20px 50px,
                             20px 50px,
                             0px 50px;
      }
      45% {
        background-size: 100px 14px,
                         100px 14px,
                         14px 14px,
                         14px 14px,
                         100% 1px,
                         calc(100% - 137px) 140px,
                         calc(100% - 137px) 140px,
                         87px 140px,
                         87px 140px,
                         calc(100% - 40px) 140px,
                         calc(100% - 40px) 140px,
                         100% 140px;
        background-position: 20px 18px,
                             20px 18px,
                             130px 18px,
                             130px 18px,
                             0px 49px,
                             20px 50px,
                             20px 50px,
                             calc(100% - 20px) 50px,
                             calc(100% - 20px) 50px,
                             20px 50px,
                             20px 50px,
                             0px 50px;
      }
      55% {
        background-size: 100px 14px,
                         100px 14px,
                         14px 14px,
                         14px 14px,
                         100% 1px,
                         calc(100% - 137px) 140px,
                         calc(100% - 137px) 140px,
                         87px 140px,
                         87px 140px,
                         calc(100% - 40px) 140px,
                         calc(100% - 40px) 140px,
                         100% 140px;
        background-position: 20px 18px,
                             20px 18px,
                             130px 18px,
                             130px 18px,
                             0px 49px,
                             calc(100% - 117px) 50px,
                             20px 50px,
                             calc(100% - 20px) 50px,
                             calc(100% - 20px) 50px,
                             calc(100% - 20px) 50px,
                             20px 50px,
                             0px 50px;
      }
      100% {
        background-size: 0px 14px,
                         100px 14px,
                         0px 14px,
                         14px 14px,
                         100% 1px,
                         0px 140px,
                         calc(100% - 137px) 140px,
                         0px 140px,
                         87px 140px,
                         0px 140px,
                         calc(100% - 40px) 140px,
                         100% 140px;
        background-position:  120px 18px,
                             20px 18px,
                             144px 18px,
                             130px 18px,
                             0px 49px,
                             calc(100% - 117px) 50px,
                             20px 50px,
                             calc(100% - 20px) 50px,
                             calc(100% - 20px) 50px,
                             calc(100% - 20px) 50px,
                             20px 50px,
                             0px 50px;
      }
    }
    &.open {
      height: 100%;
      max-height: 2000px;
      .icon-nav {
        &::before {
          transform: rotate(45deg);
          top: -2px;
          left: 3px;
        }
        &::after {
          transform: rotate(-45deg);
          top: 12px;
          left: 3px;
        }
        & span {
          width: 0%;
          opacity: 0;
        }
      }
    }
    .discussions-head {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 200;
      min-width: 300px;
      width: 100%;
      padding: 14px 20px;
      background-color: #F3F6F8;
      border-top: 1px solid transparent;
      border-bottom: 1px solid #E9EDF2;
      transition: .15s ease-in-out;
    }
    .discussions-body {
      position: relative;
      height: calc(100% - 50px);
      margin-top: 50px;
      overflow-y: scroll;
    }
    .discussion-title {
      font-size: 14px;
      line-height: 20px;
      color: #656B77;
      .title-count {
        margin-left: 10px;
        font-weight: 500;
        color: #D2D8DE;
      }
    }
    .btn-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -1px;
      right: 0;
      width: 50px;
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
    }
    .icon-nav {
      display: inline-block;
      width: 20px;
      height: 15px;
      transform: rotate(0deg);
      &::before,
      &::after,
      & span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background: #FFF;
        border-radius: 3px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .15s ease-in-out;
      }
      &::before,
      &::after {
        content: '';
      }
      &::before {
        top: 0;
        transform-origin: left center;
      }
      &::after {
        top: 12px;
        transform-origin: left center;
      }
      & span {
        top: 6px;
        transform-origin: left center;
      }
    }
    .discussion-nav {
      position: relative;
      z-index: 100;
    }
    .discussion-link {
      position: relative;
      display: block;
      padding: 14px 20px;
      text-decoration: none;
      border-left: 3px solid transparent;
      border-top: 1px solid transparent;
      border-bottom: 1px solid #E9EDF2;
      transition: background-color .15s ease-in-out, border-color .15s ease-in-out;
      &:hover {
        background-color: #FFF;
      }
      &.router-link-active {
        border-left-color: #398BFF;
        background-color: #FFF;
      }
      .link-head {
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .link-subject {
        margin-right: 10px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #35383D;
      }
      .link-created {
        flex: 1 1 auto;
        font-size: 10px;
        line-height: 14px;
        text-align: right;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #B7C0C8;
      }
      .link-body {
        padding: 1px 0;
      }
      .link-text {
        font-size: 13px;
        line-height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #7D8790;
      }
    }
  }
  @media (min-width: 1200px) {
    .discussions {
      max-width: 300px;
      height: 100%;
      &.open {
        max-height: none;
      }
      .discussions-head {
        max-width: 300px;
      }
      .discussions-body {
        overflow-y: auto;
      }
      .btn-nav {
        display: none;
      }
    }
  }
</style>
