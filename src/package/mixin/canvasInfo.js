export default {
  inject: ["getOrigin", "getUnitLength"],
  computed: {
    origin() {
      return this.getOrigin();
    },
    unitLength() {
      return this.getUnitLength();
    }
  }
}