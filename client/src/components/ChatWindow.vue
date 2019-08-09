<template>
  <section>
    <h1>Natter</h1>
    <message v-for="(item, index) in messages" :key="index" :msg="item"></message>
  </section>
</template>

<script>
import { Radio, Icon } from "iview";
import Message from "@component/message";
export default {
  name: "chat-window",
  components: {
    Message,
  },
  data() {
    return {
      messages: [{ text: 1 }, { text: 2 }, { text: 3 }],
    };
  }
};
</script>

<style scoped>
h1 {
  color: #2d8cf0;
}
</style>
