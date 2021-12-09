<template>
  <div
    :class="{ container: true, cursor: onDrag }"
    :style="{
      backgroundImage: `linear-gradient(to top,transparent ${unitLength * 0.95}px,gray ${unitLength}px), linear-gradient(to left,transparent ${unitLength * 0.95}px,gray ${unitLength}px)`,
      backgroundSize: `${unitLength}px ${unitLength}px`,
      backgroundPosition: `${-origin.x}px ${-origin.y}px`
    }"
    @mousedown="down"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CirContainer",
  provide() {
    return {
      getOrigin: () => this.origin,
      getUnitLength: () => this.unitLength
    };
  },
  data() {
    return {
      origin: {
        x: 0,
        y: 0
      },
      oldOrigin: {
        x: 0,
        y: 0
      },
      unitLength: 50,
      onDrag: false,
      startX: undefined,
      startY: undefined,
      endX: undefined,
      endY: undefined,
    };
  },
  mounted() {
    let removeSpace, catchSpace;
    removeSpace = e => {
      if (e.key === " ") {
        this.onDrag = false;
        document.removeEventListener("keyup", removeSpace);
        document.addEventListener("keydown", catchSpace);
      }
    }
    catchSpace = e => {
      if (e.key === " ") {
        this.onDrag = true;
        this.oldOrigin = this.origin;
        document.removeEventListener("keydown", catchSpace);
        document.addEventListener("keyup", removeSpace);
      }
    }
    document.addEventListener("keydown", catchSpace);

    document.addEventListener("mousewheel", e => {
      if (this.onDrag)
        this.unitLength += e.deltaY / 200;
    });
  },
  methods: {
    down(e) {
      if (!this.onDrag) {
        return;
      }
      this.startX = e.x;
      this.startY = e.y;
      const recordMouse = (e) => {
        this.endX = e.x;
        this.endY = e.y;
        this.origin = {
          x: this.oldOrigin.x - this.deltaX,
          y: this.oldOrigin.y - this.deltaY
        };
      }
      document.addEventListener("mousemove", recordMouse);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", recordMouse);
        this.oldOrigin = this.origin;
        this.startX = this.startY = this.endX = this.endY = undefined;
      });
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
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.cursor {
  cursor: move;
}
</style>