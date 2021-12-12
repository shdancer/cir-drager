export default {
  inject: ["getOrigin", "getUnitLength", "getCanvasOnDrag"],
  computed: {
    origin() {
      return this.getOrigin();
    },
    unitLength() {
      return this.getUnitLength();
    },
    canvasOnDrag() {
      return this.getCanvasOnDrag();
    }
  }
}