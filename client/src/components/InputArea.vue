<template>
  <section>
    <textarea
      ref="inputArea"
      v-model="input"
      placeholder="你想说啥？"
      autofocus
      @keyup.shift.enter="send"
    ></textarea>
    <div class="btn-wrapper">
      <Button type="default" long @click="send">
        <Icon type="ios-send" size="24" />发送
      </Button>
    </div>
  </section>
</template>

<script>
import { Button, Icon } from "iview";
export default {
  name: "input-area",
  data() {
    return {
      input: "今天我们要教大家如何通过webhook发送通知到BearyChat（倍洽）"
    };
  },
  components: {
    Button,
    Icon
  },
  methods: {
    send() {
      this.$refs.inputArea.focus();
      if (this.input.trim() == "") return;
      this.$emit("send", this.input);
      this.input = "";
    }
  }
};
</script>

<style scoped>
section {
  font-size: 0;
}
textarea {
  width: 100%;
  height: 150px;
  outline: none;
  padding: 10px;
  font-size: 13px;
  border: none;
  resize: none;
  /* border-top: 3px solid blue; */
}
.btn-wrapper {
  padding: 10px 10px;
}
</style>
