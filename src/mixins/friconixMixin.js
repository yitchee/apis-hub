import {friconix_update} from  '../assets/js/friconix.js';


const friconixMixin = {
  mounted: function() {
    friconix_update();
  }
};

export default friconixMixin;