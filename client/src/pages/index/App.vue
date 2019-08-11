<template>
  <section>
    <chat-window channel="乡下大佬"/>
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
</style>
