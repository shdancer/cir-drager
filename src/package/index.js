import CirComponent from "./CirComponent";
import CirContainer from "./CirContainer";
import CirWire from "./CirWire";

const components = [
  CirComponent,
  CirContainer,
  CirWire
];

const install = Vue => {
  if (install.installed)
    return;
  install.installed = true;

  components.map(component => Vue.use(component));
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components
};