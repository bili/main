<template>
  <div class="layout">
    <Sider
      :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto', borderRight: '1px solid #ddd', background: 'white'}"
    >
      <Menu :theme="theme" width="200px" :open-names="openNames">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper" />Channels
          </template>
          <router-link :to="'/channel/'+item" v-for="(item, index) in channels" :key="index">
            <MenuItem :name="item+'-'+index">
              <div class="menu-item">
                <Icon type="ios-people" size="20" />
                <div>{{item}}</div>
              </div>
            </MenuItem>
          </router-link>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-people" />Bots
          </template>
          <MenuItem name="2-1">EasyOps-bot</MenuItem>
          <MenuItem name="2-2">Diary-bot</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px', marginRight: '200px'}">
      <Content class="content">
        <div ref="channel" class="channel" :class="{shadow: isOverflow}">
          <Icon type="ios-chatbubbles" size="20" color="#ccc" />
          <span>{{$route.params.channel}}</span>
          <span class="href" @click="copy(href)">{{href}}</span>
          <Icon type="md-copy" class="copy" color="#ccc" @click="copy(href)" />
        </div>
        <Scroll ref="scrollView" :height="scrollHeight">
          <keep-alive>
            <router-view ref="chatWin"></router-view>
          </keep-alive>
        </Scroll>
        <input-area ref="inputArea" @send="sendMessage" />
      </Content>
    </Layout>
    <Sider
      :style="{position: 'fixed', height: '100vh', top: 0, right: 0, overflow: 'auto', borderLeft: '1px solid #ddd', background: 'white  '}"
    >
      <Card title="Options" icon="ios-options" :padding="0" shadow style="width: 200px;">
        <CellGroup>
          <Cell title="Only show titles" />
          <Cell title="Display label content" label="label content" />
          <Cell title="Display right content" extra="details" />
          <Cell title="Link" extra="details" to="/components/button" />
          <Cell title="Open link in new window" to="/components/button" target="_blank" />
          <Cell title="Disabled" disabled />
          <Cell title="Selected" selected />
          <Cell title="With Badge" to="/components/badge">
            <Badge :count="10" slot="extra" />
          </Cell>
          <Cell title="With Switch">
            <ISwitch v-model="switchValue" slot="extra" />
          </Cell>
        </CellGroup>
      </Card>
    </Sider>
  </div>
</template>

<script>
import { debounce } from "lodash";
import {
  Layout,
  Sider,
  Icon,
  Scroll,
  Card,
  Cell,
  CellGroup,
  Message as Msg,
  Switch as ISwitch,
  Badge,
  MenuGroup,
  Menu,
  MenuItem,
  Submenu
} from "iview";
import Message from "@component/Message";
import InputArea from "@component/InputArea";
export default {
  name: "main-win",
  components: {
    Message,
    Layout,
    Sider,
    Icon,
    Cell,
    Scroll,
    Card,
    CellGroup,
    InputArea,
    ISwitch,
    Badge,
    MenuGroup,
    Menu,
    MenuItem,
    Submenu
  },
  computed: {
    href() {
      return decodeURIComponent(window.location.href);
    }
  },
  data() {
    return {
      theme: "light",
      openNames: ["1", "2"],
      channels: ["乡下大佬", "平安行", "外卖vip", "敢死队", "摄影交流群"],
      messages: [
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
      scrollHeight: 0,
      isOverflow: false,
      ws: null,
      COMMANDS: {},
      myNick: "",
      switchValue: false
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
      console.log('=======push', args)
      if (args.text) {
        this.$refs.chatWin.appendMessage({
          text: args.text,
          nick: args.nick,
          channel: args.channel
        });
      }
      setTimeout(() => {
        this.scrollToBottom();
        // if (
        //   this.$refs.scrollView.$el &&
        //   this.$refs.scrollView.$el.querySelector(".ivu-scroll-content")
        //     .offsetTop > 0
        // ) {
        //   this.isOverflow = true;
        // }
      }, 50);
    },
    scroll() {
      console.log(1);
      // this.isOverflow = false;
    },
    sendMessage(input) {
      this.send({ cmd: "chat", text: input, channel: this.channel });
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
          this.myNick = prompt("创建一个昵称:", this.myNick);
          window.localStorage.setItem("myNick", this.myNick);
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
            text: "Server disconnected. Attempting to reconnect. . .",
            channel: channel
          });
        }

        window.setTimeout(() => {
          this.join(channel);
        }, 2000);
      };

      this.ws.onmessage = message => {
        var args = JSON.parse(message.data);
        var cmd = args.cmd;
        // var command = this[cmd];
        // command.call(null, args);
        this.chat.call(null, args);
      };
    },
    chat(args) {
      this.pushMessage(args);
    },
    onlineSet(args) {},
    copy(data) {
      if (window.clipboardData) {
        window.clipboardData.setData("channel", data);
      } else {
        var textArea = document.createElement("textarea");
        textArea.style.position = "absolute";
        textArea.style.left = "-100%";
        textArea.value = data;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        Msg.success("复制channel成功");
      }
    }
  }
};
</script>
<style>
.ivu-menu {
  color: dimgray !important;
}
/* 菜单主项 */
.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: dimgray !important;
}
</style>
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
  background: #ececec;
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
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}
.channel > span {
  color: #000;
}
.channel > span.href {
  font-size: 13px;
  color: #ccc;
}
.row {
  padding: 5px;
  border-bottom: 1px solid #eee;
}
.row:last-child {
  border-bottom: none;
}
.href,
.copy {
  cursor: pointer !important;
}
.href {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 子菜单 */
.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 5px 24px;
  cursor: default !important;
}

.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: white;
  background: #eee;
}

.ivu-menu-light {
  background: none;
}
.ivu-menu {
  color: dimgray !important;
}
/* 菜单激活状态 */
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: darkblue;
  background: lightblue;
}
/* channel单项 */
.menu-item {
  display: flex;
  align-items: center;
}
.menu-item > div {
  margin-left: 5px;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  background: none;
}
</style>
