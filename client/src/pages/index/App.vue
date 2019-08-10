<template>
  <section>
    <chat-window />
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
