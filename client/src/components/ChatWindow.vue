<template>
  <div class="layout">
    <Sider></Sider>
    <Layout>
      <Content ref="content">
        <div class="channel">
          Channel:
          <span>{{channel}}</span>
        </div>
        <Scroll :height="scrollHeight">
          <message class="row" v-for="(item, index) in messages" :key="index" :msg="item" />
        </Scroll>
        <input-area id="inputArea" />
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
  data() {
    return {
      channel: "乡下大佬",
      messages: [
        { text: 1 },
        { text: "Computed reversed message" },
        { text: `Original message: "Hello"` },
        { text: `额外操作和主体内容` },
        { text: `Message Layout` },
        { text: 2 },
        {
          text: `你可以像绑定普通属性一样在模板中绑定计算属性。Vue 知道 vm.reversedMessage 依赖于 vm.message，因此当 vm.message 发生改变时，所有依赖 vm.reversedMessage 的绑定也会更新。`
        },
        { text: `Message Layout` },
        { text: `Message Layout` },
        { text: `Message Layout` },
        { text: `Message Layout` },
        { text: `Message Layout` },
        { text: `Message Layout` }
      ],
      scrollHeight: 0
    };
  },
  mounted() {
    this.$on("send", input => {
      this.messages.push({
        text: input
      });
    });
    let resize = debounce(this.autoResize, 50);
    resize();
    window.onresize = () => {
      resize();
    };
  },
  methods: {
    autoResize() {
      this.scrollHeight =
        window.innerHeight -
        parseFloat(this.$el.querySelector("#inputArea").clientHeight) -
        parseFloat(this.$el.querySelector(".channel").clientHeight);
    }
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
.channel > span {
  color: blue;
}
.row {
  padding: 5px;
  border-bottom: 1px solid #eee;
}
.row:last-child {
  border-bottom: none;
}
</style>
