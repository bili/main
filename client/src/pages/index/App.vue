<template>
  <section>
    <main-win />
  </section>
</template>

<script>
import { Icon } from "iview";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Icon,
    MainWin: () => import("@component/MainWin")
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
