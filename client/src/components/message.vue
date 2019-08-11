<template>
  <div class="wrapper" :class="{me: msg.nick == me}">
    <div class="status">
      <div class="sender">{{msg.nick}}</div>
      <div class="send-time">{{new Date().getTime()}}</div>
    </div>
    <div class="msg">
      <div>{{text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  props: ["msg", "me"],
  computed: {
    text() {
      return this.msg.text || "";
    },
    nick() {
      return this.msg.nick || "unknown";
    }
  },
  mounted() {}
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.status {
  display: flex;
  flex-direction: row;
  padding: 0 5px;
  color: #999;
}
.msg > div {
  display: inline-flex;
  max-width: 90%;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 10px;
  border-top-left-radius: 0;
  /* border-left: 3px solid #ccc;
  border-bottom: 1px solid #ccc;
  background: #eee; */
  background: linear-gradient(0deg, #b3dccd, #ccefdd);
  font-weight: bold;
  color: #333;
}
.wrapper:hover .msg > div {
  /* color: white; */
  /* background: linear-gradient(0deg, #4a9bff, #43dcff); */
  /* background: blue;
  border-color: darkblue; */
}
.send-time {
  margin-left: 10px;
}

.me .status {
  justify-content: flex-end;
}
.me .msg {
  display: flex;
  justify-content: flex-end;
}
.me .msg > div {
  color: white;
  background: linear-gradient(0deg, #d322ff, #8e79ff);
  /* background: linear-gradient(0deg, #ff5722, #ff8279); */
  border-top-left-radius: 10px;
  border-top-right-radius: 0;
}
</style>
