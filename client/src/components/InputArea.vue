<template>
  <section>
    <textarea v-model="input" placeholder="你想说啥？"></textarea>
  </section>
</template>

<script>
export default {
  name: "input-area",
  data() {
    return {
      input: "今天我们要教大家如何通过webhook发送通知到BearyChat（倍洽）。"
    };
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100%;
  min-height: 150px;
  outline: none;
  padding: 10px;
  font-size: 16px;
  border: none;
}
</style>
