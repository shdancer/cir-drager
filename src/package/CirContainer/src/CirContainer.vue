<template>
  <div
    :class="{ container: true, cursor: onDrag }"
    :style="{
      backgroundImage: `linear-gradient(to top,transparent ${unitLength * 0.95}px,gray ${unitLength}px), linear-gradient(to left,transparent ${unitLength * 0.95}px,gray ${unitLength}px)`,
      backgroundSize: `${unitLength}px ${unitLength}px`,
      backgroundPosition: `${-origin.x + delta.x}px ${-origin.y + delta.y}px`
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import drager from "../../mixin/drager";
export default {
  name: "CirContainer",
  mixins: [drager],
  provide() {
    return {
      getOrigin: () => ({
        x: this.origin.x - this.delta.x,
        y: this.origin.y - this.delta.y
      }),
      getUnitLength: () => this.unitLength,
      getCanvasOnDrag: () => this.onDrag
    };
  },
  props: {
    initialUnitLength: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      origin: {
        x: 0,
        y: 0
      },
      unitLength: 50,
      onDrag: false,
    };
  },
  mounted() {
    this.unitLength = this.initialUnitLength;
    const removeSpace = e => {
      if (e.key === " ") {
        this.onDrag = false;
        document.removeEventListener("keyup", removeSpace);
        document.addEventListener("keydown", catchSpace);
      }
    }
    const catchSpace = e => {
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
  watch: {
    finishDrag() {
      if (this.finishDrag === false)
        return;
      this.finishDrag = false;
      this.origin = {
        x: this.origin.x - this.delta.x,
        y: this.origin.y - this.delta.y
      };

      this.resetDrager();
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