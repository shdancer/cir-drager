import CirWire from "./src/CirWire";

CirWire.install = Vue => {
  Vue.component(CirWire.name, CirWire);
}

export default CirWire;