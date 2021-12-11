<template>
  <div>{{ delta }}</div>
</template>

<script>
import canvasInfo from "../../mixin/canvasInfo";
import drager from "../../mixin/drager";
export default {
  name: "CirWire",
  mixins: [canvasInfo, drager],
  data() {
    return {

    }
  }
}
</script>

<style scoped>
div {
  width: 20px;
  height: 20px;
}
</style>