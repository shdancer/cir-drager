export default {
  data() {
    return {
      delta: {
        x: 0,
        y: 0
      },
      finishDrag: false
    };
  },
  mounted() {
    this.$el.addEventListener("mousedown", this.down);
  },
  methods: {
    down(e) {
      e.stopPropagation();
      if (this.onDrag === false)
        return;
      const start = {
        x: e.x,
        y: e.y
      };

      const record = e => {
        this.delta = {
          x: e.x - start.x,
          y: e.y - start.y
        };
      }

      const update = e => {
        record(e);
        window.addEventListener("mouseup", finish);
      }

      const finish = e => {
        record(e);
        this.finishDrag = true;
        window.removeEventListener("mousemove", update);
        window.removeEventListener("mouseup", finish);
      }

      window.addEventListener("mousemove", update);
    },
    resetDrager() {
      this.delta = {
        x: 0,
        y: 0
      };
    }
  }
}