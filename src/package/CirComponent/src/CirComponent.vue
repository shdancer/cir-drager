<template>
  <div
    :class="{ component: true, 'ease-trans': transition }"
    :style="{
      width: `${unit.x * unitLength}px`,
      height: `${unit.y * unitLength}px`,
      top: `${pos.x * unitLength + deltaY - origin.y}px`,
      left: `${pos.y * unitLength + deltaX - origin.x}px`
    }"
    @mousedown="down"
  ></div>
</template>

<script>
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
  inject: ["getOrigin", "getUnitLength"],
  data() {
    return {
      startX: undefined,
      startY: undefined,
      endX: undefined,
      endY: undefined,
      pos: {
        x: undefined,
        y: undefined
      },
      transition: false
    }
  },
  mounted() {
    this.pos = this.initialPos;
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.recordMouse);
      this.transition = true;
      setTimeout(() => {
        this.transition = false;
      }, 200);
      this.pos = {
        x: this.pos.x + Math.round(this.deltaY / this.unitLength),
        y: this.pos.y + Math.round(this.deltaX / this.unitLength)
      };
      this.$emit("posChange", this.pos);
      this.startX = this.startY = this.endX = this.endY = undefined;
    });
  },
  methods: {
    down(e) {
      this.startX = e.x;
      this.startY = e.y;
      document.addEventListener("mousemove", this.recordMouse);
    },
    recordMouse(e) {
      this.endX = e.x;
      this.endY = e.y;
    }
  },
  computed: {
    deltaX() {
      if ([this.startX, this.endX].includes(undefined)) {
        return 0;
      }
      return this.endX - this.startX;
    },
    deltaY() {
      if ([this.startY, this.endY].includes(undefined)) {
        return 0;
      }
      return this.endY - this.startY;
    },
    origin() {
      return this.getOrigin();
    },
    unitLength() {
      return this.getUnitLength();
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