const responseMixin = {
  data() {
    return {
      showResult: false,
      // requestUrlToShow: '',
    }
  },
  methods: {
    setShowResult: function() {
      this.showResult = true;
    },
    // setRequestUrlToShow: function(url) {
    //   this.requestUrlToShow = url;
    // }
  }
};

export default responseMixin;