import CirContainer from "./src/CirContainer.vue";

CirContainer.install = Vue => {
  Vue.component(CirContainer.name, CirContainer);
};

export default CirContainer;
