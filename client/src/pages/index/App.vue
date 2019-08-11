<template>
  <section>
    <div class="entry">
      <router-link to="/channel/乡下大佬">乡下大佬</router-link>
      <router-link to="/channel/A">A</router-link>
    </div>
    <router-view></router-view>
    <!-- <chat-window channel="乡下大佬"/> -->
  </section>
</template>

<script>
export default {
  name: "App",
  components: {
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
}
</style>
