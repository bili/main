<template>
  <div class="layout">
    <Sider></Sider>
    <Layout>
      <Content class="content">
        <div ref="channel" class="channel" :class="{shadow: isOverflow}">
          <Icon type="ios-chatbubbles" size="20" color="#ccc" />
          <span>{{channel}}</span>
        </div>
        <Scroll ref="scrollView" :height="scrollHeight">
          <message
            class="row"
            v-for="(item, index) in messages"
            :key="index"
            :msg="item"
            :me="myNick"
          />
        </Scroll>
        <input-area ref="inputArea" @send="sendMessage" />
      </Content>
    </Layout>
  </div>
</template>

<script>
import { debounce } from "lodash";
import { Layout, Sider, Icon, Scroll, Card } from "iview";
import Message from "@component/Message";
import InputArea from "@component/InputArea";
export default {
  name: "chat-window",
  components: {
    Message,
    Layout,
    Sider,
    Icon,
    Scroll,
    Card,
    InputArea
  },
  computed: {},
  props: ["channel"],
  data() {
    return {
      channel: "",
      messages: [
        // { text: 1 },
        // { text: "Computed reversed message" },
        // { text: `Original message: "Hello"` },
        // { text: `额外操作和主体内容` },
        // { text: `Message Layout` },
        // { text: 2 },
        // {
        //   text: `你可以像绑定普通属性一样在模板中绑定计算属性。Vue 知道 vm.reversedMessage 依赖于 vm.message，因此当 vm.message 发生改变时，所有依赖 vm.reversedMessage 的绑定也会更新。`
        // },
        // { text: `Message Layout` }
      ],
      scrollHeight: 0,
      isOverflow: false,
      ws: null,
      COMMANDS: {},
      myNick: ""
    };
  },
  mounted() {
    let resize = debounce(this.autoResize, 50);
    resize();
    window.onresize = () => {
      resize();
    };
    this.$refs.scrollView.$el
      .querySelector(".ivu-scroll-content")
      .addEventListener(
        "",
        () => {
          console.log(1);
        },
        false
      );
    this.channel = this.$route.params.channel;
    this.join(this.channel);
  },
  methods: {
    autoResize() {
      this.scrollHeight =
        window.innerHeight -
        parseFloat(this.$refs.inputArea.$el.clientHeight) -
        parseFloat(this.$refs.channel.offsetHeight);
    },
    scrollToBottom() {
      this.$refs.scrollView.$el
        .querySelector(".ivu-scroll-content")
        .scrollIntoView({ block: "end", behavior: "smooth" });
    },
    pushMessage(args) {
      if (args.text) {
        this.messages.push({
          text: args.text,
          nick: args.nick
        });
      }
      setTimeout(() => {
        this.scrollToBottom();
        if (
          this.$refs.scrollView.$el &&
          this.$refs.scrollView.$el.querySelector(".ivu-scroll-content")
            .offsetTop > 0
        ) {
          this.isOverflow = true;
        }
      }, 50);
    },
    scroll() {
      console.log(1);
      // this.isOverflow = false;
    },
    sendMessage(input) {
      this.send({ cmd: "chat", text: input });
    },
    send(data) {
      if (this.ws && this.ws.readyState == this.ws.OPEN) {
        this.ws.send(JSON.stringify(data));
      }
    },
    join(channel) {
      let protocol = location.protocol === "https:" ? "wss:" : "ws:";
      let wsPath = ":6060";
      this.ws = new WebSocket(protocol + "//" + document.domain + wsPath);
      let wasConnected = false;

      this.ws.onopen = () => {
        if (!wasConnected) {
          this.myNick = prompt("Nickname:", this.myNick);
        }

        if (this.myNick) {
          this.send({ cmd: "join", channel: channel, nick: this.myNick });
        }

        wasConnected = true;
      };

      // 断开连接后
      this.ws.onclose = () => {
        if (wasConnected) {
          this.pushMessage({
            nick: "!",
            text: "Server disconnected. Attempting to reconnect. . ."
          });
        }

        window.setTimeout(() => {
          this.join(channel);
        }, 2000);
      };

      this.ws.onmessage = message => {
        var args = JSON.parse(message.data);
        var cmd = args.cmd;
        console.log("onmessage", args);
        // var command = this[cmd];
        // command.call(null, args);
        this.chat.call(null, args);
      };
    },
    chat(args) {
      this.pushMessage(args);
    },
    onlineSet(args) {}
  }
};
</script>

<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
/* 聊天window背景 */
.ivu-scroll-wrapper {
  /* background: lightgoldenrodyellow; */
}
.layout-header-bar {
  background: #fff;
}
.ivu-scroll-container {
  height: auto !important;
}
.channel {
  padding: 5px 10px;
  font-size: 16px;
  background: white;
  color: #999;
}
.channel.shadow {
  position: relative;
  z-index: 1;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}
.channel > span {
  color: #000;
}
.row {
  padding: 5px;
  border-bottom: 1px solid #eee;
}
.row:last-child {
  border-bottom: none;
}
</style>
