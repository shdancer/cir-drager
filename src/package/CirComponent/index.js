import CirComponent from "./src/CirComponent.vue";

CirComponent.install = Vue => {
  Vue.component(CirComponent.name, CirComponent);
};

export default CirComponent;