Component({
  properties: {
    room: {
      type: Object,
      value: {},
    },
  },
  methods: {
    onTap() {
      this.triggerEvent('select', { room: this.properties.room });
    },
  },
});
