const responseMixin = {
  data() {
    return {
      showResult: false,
      finalUrlToShow: '',
    }
  },
  methods: {
    setShowResult: function() {
      this.showResult = true;
    },
    setFinalRequestUrlToShow: function(url) {
      this.finalUrlToShow = this.formatUrlToShow(url);
    },
    formatUrlToShow: function(url) {
      url = url.replace(/ /gm, '%20');
      url = url.replace(/(\w+)=([^?&[]+)/gm, '<span class="query-variable">$1</span>=<span class="query-value">$2</span>');
      return url;
    }
  }
};

export default responseMixin;