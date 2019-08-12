<template>
  <section @drop="drop">
    <textarea
      ref="inputArea"
      v-model="input"
      :placeholder="placeholder"
      autofocus
      @keyup.shift.enter="send"
    ></textarea>
    <div class="btn-wrapper">
      <Button type="default" long @click="send">
        <Icon type="ios-send" size="24" />发送(shift+enter)
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
      input: "",
      placeholder: `Type '/' for commands`
    };
  },
  components: {
    Button,
    Icon
  },
  methods: {
    send(input) {
      if (!input) {
        this.$refs.inputArea.focus();
        if (this.input.trim() == "") return;
        this.$emit("send", this.input);
        this.input = "";
      } else {
        this.$emit("send", input);
      }
    },
    drop(e) {
      const _this = this;
      e.preventDefault();
      let file = e.dataTransfer.files[0];
      let reader = new FileReader();
      reader.onload = function() {
        _this.send(this.result);
      };
      reader.onerror = function() {};
      reader.readAsText(file);
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
  border-top: 1px solid #e0e0e0;
}
.btn-wrapper {
  padding: 10px 10px;
}
</style>
