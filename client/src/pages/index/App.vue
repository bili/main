<template>
  <section>
    <chat-window />
  </section>
</template>

<script>
// import "iview/dist/styles/iview.css";

export default {
  name: "App",
  components: {
    ChatWindow: () => import("@component/ChatWindow")
  },
  mounted() {}
};
</script>

<style>
</style>
