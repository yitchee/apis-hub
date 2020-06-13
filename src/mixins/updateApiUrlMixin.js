const updateApiUrlMixin = {
  created: function() {
    this.updateUrlEvent();
  },
  methods: {
    updateUrlEvent: function() {
      this.$emit('updateApiUrl', this.url);
    },
  },
};

export default updateApiUrlMixin;