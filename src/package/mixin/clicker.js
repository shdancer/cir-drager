export default {
  data() {
    return {
      delta: {
        x: 0,
        y: 0
      },
      clicking: false,
      finishClick: false
    };
  },
  methods: {
    click(e) {
      if (this.clicking)
        return;
      this.clicking = true;
      e.stopPropagation();
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
        window.addEventListener("click", finish);
      }

      const finish = e => {
        record(e);
        this.clicking = false;
        this.finishClick = true;
        window.removeEventListener("mousemove", update);
        window.removeEventListener("click", finish);
      }

      window.addEventListener("mousemove", update);
    },
    resetClicker() {
      this.delta = {
        x: 0,
        y: 0
      };
    }
  }
}