<template>
  <div class="nodes">
    <div
      class="node"
      v-for="(pos, index) in nodes"
      :key="'n' + index"
      :style="{
        width: `${0.15 * unitLength}px`,
        height: `${0.15 * unitLength}px`,
        left: `${pos.x * unitLength - origin.x}px`,
        top: `${pos.y * unitLength - origin.y}px`,
        transition: !canvasOnDrag ? 'top 0.1s ease-out,left 0.1s ease-out' : ''
      }"
      @click="draw(index, $event)"
    ></div>
    <div
      class="edge"
      v-for="(edge, index) in edges"
      :key="'e' + index"
      :style="{
        width: `${Math.abs(nodes[edge.from].x - nodes[edge.to].x) * unitLength}px`,
        height: `${Math.abs(nodes[edge.from].y - nodes[edge.to].y) * unitLength}px`,
        left: `${Math.min(nodes[edge.from].x, nodes[edge.to].x) * unitLength - origin.x}px`,
        top: `${Math.min(nodes[edge.from].y, nodes[edge.to].y) * unitLength - origin.y}px`,
        borderTop: edgeMode[index] ? `${0.1 * unitLength}px solid black` : '',
        borderBottom: !edgeMode[index] ? `${0.1 * unitLength}px solid black` : '',
        borderLeft: (relativePos(edge) ^ edgeMode[index]) ? `${0.1 * unitLength}px solid black` : '',
        borderRight: !(relativePos(edge) ^ edgeMode[index]) ? `${0.1 * unitLength}px solid black` : '',
        transform: `translate(${-0.05 * unitLength}px,  ${-0.05 * unitLength}px)`
      }"
    ></div>
  </div>
</template>

<script>
import canvasInfo from "../../mixin/canvasInfo";
import clicker from "../../mixin/clicker";
export default {
  name: "CirWire",
  mixins: [canvasInfo, clicker],
  props: {
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
  data() {
    return {
      nodes: [this.initialPos],
      edges: [],
      movingNode: {},
      edgeMode: []
    };
  },
  mounted() {
    addEventListener("keypress", e => {
      if (this.clicking)
        if (e.key === "c") {
          this.$set(this.edgeMode, this.edgeMode.length - 1, !this.edgeMode[this.edgeMode.length - 1]);
        }
    });
  },
  methods: {
    draw(index, e) {
      if (this.clicking)
        return;
      this.edges.push({
        from: index,
        to: this.nodes.length
      });
      this.edgeMode.push(true);
      this.nodes.push(this.nodes[index]);
      this.movingNode = this.nodes[this.nodes.length - 1];
      this.click(e);
    },
    relativePos(edge) {
      return (this.nodes[edge.from].x - this.nodes[edge.to].x) * (this.nodes[edge.from].y - this.nodes[edge.to].y) > 0;
    }
  },
  watch: {
    finishClick() {
      if (this.finishClick === false)
        return;
      this.finishClick = false;
      this.resetClicker();
    },
    delta() {
      if (this.clicking)
        this.$set(this.nodes, this.nodes.length - 1, {
          x: this.movingNode.x + Math.round(this.delta.x / this.unitLength),
          y: this.movingNode.y + Math.round(this.delta.y / this.unitLength)
        });
    }
  }
}
</script>

<style scoped>
.node {
  border-radius: 50%;
  border: 2px solid black;
  transform: translate(-50%, -50%);
  position: absolute;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
.node:hover {
  background-color: rgb(80, 80, 140);
}
.edge {
  position: absolute;
  z-index: -1;
  transition: height 0.1s ease-out, width 0.1s ease-out, border 0.1s ease-in-out;
}
</style>