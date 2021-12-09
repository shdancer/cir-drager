# CirDrager
## 简介
CirDrager是一个专门用来解决电路画板的轻量级拖拽式组件库，他提供了一些基础的拖拽组件库让你快速开发出（电路）画板。

## 安装和使用
### 全局安装
```shell
npm i cir-drager
```
即可安装CirDrager组件库。


```js
import Vue from 'vue'
import App from './App.vue'
import CirDrager from 'cir-drager'
import 'cir-drager/lib/cir-drager.css'

Vue.config.productionTip = false
Vue.use(CirDrager)

new Vue({
  render: h => h(App),
}).$mount('#app')
```
之后在`main.js`中引入组件库及样式，再使用`vue`统一的插件管理即可。
### 按需引入
```html
<script>
import CirContainer from 'cir-drager';
export default {
  components: {
    CirContainer
  }
}
</script>
```
这样即可以单独引入需要的组件。
## 组件介绍
+ `CirContainer`
  CirDrager的开始，一个画布可以承载元件。
  + props:
    + initialUnitLength: 初始单位长度（px），默认值50
  + 操作:
    + 按住空格滑动鼠标滚轮即可缩放画布
    + 按住空格拖动鼠标即可拖动画布
+ `CirComponent`
  一个电路组件，支持网格吸附，鼠标可以拖动。
  + props:
    + unit: 组件的长宽（格），默认值（1，1）
    + initialPos: 组件的初始位置（格）（相对于画布左上角），默认值（0，0）
  + 事件:
    + posChange: 组件被放下的时候出发，参数为当前组件的位置对象
  + 操作：
    + 鼠标可直接拖动
    + 鼠标放开后可以吸附到网格上
## 示例
```html
<cir-container>
  <cir-component :unit="{ x: 1, y: 1 }" :initialPos="{ x: 1, y: 1 }"></cir-component>
  <cir-component />
</cir-container>
```
## TODO
- [ ] 加入导线组件