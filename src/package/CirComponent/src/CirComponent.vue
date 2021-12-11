<template>
  <div
    :class="{ component: true, 'ease-trans': transition }"
    :style="{
      width: `${unit.x * unitLength}px`,
      height: `${unit.y * unitLength}px`,
      top: `${pos.y * unitLength + delta.y - origin.y}px`,
      left: `${pos.x * unitLength + delta.x - origin.x}px`
    }"
  ></div>
</template>

<script>
import canvasInfo from "../../mixin/canvasInfo"
import drager from "../../mixin/drager"
export default {
  name: "CirComponent",
  props: {
    unit: {
      type: Object,
      default() {
        return {
          x: 1,
          y: 1
        }
      }
    },
    initialPos: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0
        }
      }
    }
  },
  mixins: [canvasInfo, drager],
  data() {
    return {
      pos: {
        x: undefined,
        y: undefined
      },
      transition: false
    }
  },
  mounted() {
    this.pos = this.initialPos;
  },
  watch: {
    finishDrag() {
      if (this.finishDrag === false)
        return;
      this.finishDrag = false;
      this.pos = {
        x: this.pos.x + Math.round(this.delta.x / this.unitLength),
        y: this.pos.y + Math.round(this.delta.y / this.unitLength)
      };
      this.transition = true;
      setTimeout(() => {
        this.transition = false;
      }, 200);

      this.resetDrager();
    }
  }
}
</script>

<style scoped>
.component {
  background-color: red;
  position: absolute;
  cursor: pointer;
}
.ease-trans {
  transition: left 0.2s ease-in-out, top 0.2s ease-in-out;
}
</style>