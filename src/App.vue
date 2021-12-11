<template>
  <div id="app">
    <CirContainer>
      <CirComponent :unit="{ x: 2, y: 3 }" :initialPos="{ x: 5, y: 6 }" />
      <CirComponent />
      <cir-wire />
    </CirContainer>
  </div>
</template>

<script>
export default {
  name: "App",

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
