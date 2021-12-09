import CirContainer from "./src/CirContainer.vue";

CirContainer.install = Vue => {
  Vue.component(CirContainer.name, CirContainer);
  console.log(CirContainer.name, "installed")
};

export default CirContainer;
