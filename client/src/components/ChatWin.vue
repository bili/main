<template>
  <div>
    <message
      class="row"
      v-for="(item, index) in messages[channel]"
      :key="index"
      :msg="item"
      :me="myNick"
    />
  </div>
</template>

<script>
import Message from "@component/Message";
export default {
  name: "chat-win",
  components: {
    Message
  },
  computed: {
    myNick() {
      return window.localStorage.getItem('myNick')
    }
  },
  data() {
    return {
      channel: "",
      messages: {
        外卖vip: [
          {
            text: `BearyChat - 云+社区 - 腾讯云 湾区的创业团队估计都在用 (https:slack.com ),国内的新锐 im 团队基本也都是照着 slack 的样子来搞,比如 瀑布im、bearychat,特点是可以接入各类服务,用起来...`,
            nick: "ken"
          },
          {
            text: `用户端的报错信息会通过 Bug 收集工具上传到 Crash Reporter 系统，并以聊天机器人消息的形式发送到讨论组中。开发人员直接查收报错信息，无需定时去 Crash Reporter 系统进行人工检查。`,
            nick: "bili"
          },
          { text: `npm install vue-router`, nick: "ken" },
          {
            text: `git clone https://github.com/vuejs/vue-router.git node_modules/vue-router cd node_modules/vue-router npm install npm run build`,
            nick: "bili"
          },
          {
            text: `Webhook可以用作升级一个issue追踪，触发CI构建，升级一个后端镜像，或者甚至是部署你的生产服务器。`,
            nick: "ken"
          },
          {
            text: `Server disconnected. Attempting to reconnect. . .`,
            nick: "bili"
          }
        ],
        平安行: [
          {
            text: `fsiafji fjas `,
            nick: "ken"
          },
          {
            text: `r method "myNick" is not fjas `,
            nick: "bili"
          }
        ]
      }
    };
  },
  mounted() {
    this.channel = this.$route.params.channel;
  },
  methods: {
    appendMessage(msg) {
      this.messages[msg.channel].push(msg)
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.channel = to.params.channel;
    next();
  }
};
</script>
<style>
</style>
