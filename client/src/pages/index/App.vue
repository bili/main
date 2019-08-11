<template>
  <section>
    <div class="entry">
      <p>公共channels:</p>
      <p>这里列举了一些常用的channels。</p>
      <ul>
        <li v-for="(item, index) in channels" :key="index">
          <Icon type="ios-chatbubbles" color="#ccc" />
          <router-link :to="item.link">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <!-- <chat-window channel="乡下大佬"/> -->
  </section>
</template>

<script>
import { Icon } from "iview";
export default {
  name: "App",
  data() {
    return {
      channels: [
        {link: '/channel/乡下大佬', name: '乡下大佬'},
        {link: '/channel/合家欢', name: '合家欢'},
      ]
    }
  },
  components: {
    Icon,
    ChatWindow: () => import("@component/ChatWindow")
  },
  mounted() {}
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-weight: bold;
}
* {
  cursor: default;
}
.entry {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.entry p {
  font-size: 13px;
  color: #333;
}
.entry li {
  font-size: 16px;
}
.entry li a {
  color: blue;
}
.entry li a:hover {
  border-bottom: 1px solid blue;
}
</style>
