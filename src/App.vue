<template>
  <div id="app">
    <CirContainer>
      <CirComponent :unit="{ x: 2, y: 3 }" :initialPos="{ x: 5, y: 6 }" />
      <CirComponent :unit="{ x: 3, y: 2 }" :initialPos="{ x: 12, y: 13 }" />
    </CirContainer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    test(e) {
      console.log(e);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 90vh;
}
</style>
