<template>
  <div class="cat-api">
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div class="mb-4">
      This is a simple API that returns an object that contains a URL of the random cat picture. Simply 
      call <code>http://aws.random.cat/meow</code> and every request will return a different 
      picture. The available file extensions are <code>.jpg</code>, <code>.jpeg</code>, 
      <code>.png</code>, and <code>.gif</code> .
    </div>
    <div>
      <ApiTag :requireKey="false"></ApiTag>
    </div>
    <ApiHelper />
    <VButton @clicked="getApiData"></VButton>
    <VRequestResponse :showResult="showResult" :requestUrl="requestUrlToShow" :apiResult="apiResult"></VRequestResponse>
    <ImageView :imgSrc="imgSrc" />
  </div>
</template>


<script>
import VButton from '@/components/VButton.vue'
import VRequestResponse from '@/components/VRequestResponse.vue';
import ImageView from '@/components/ImageView.vue'
import ApiHeader from '@/components/ApiHeader.vue'
import ApiHelper from '@/components/ApiHelper.vue'
import ApiTag from '@/components/ApiTag.vue'

import responseMixin from '@/mixins/responseMixin.js';


export default {
  name: 'CatApi',
  mixins: [responseMixin],
  components: {
    VButton,
    ImageView,
    VRequestResponse,
    ApiHeader,
    ApiHelper,
    ApiTag
  },
  data: function() {
    return {
      title: 'Random.Cat API',
      apiWebsiteLink: 'https://random.cat',
      apiUrl: 'https://aws.random.cat/meow',
      url: 'http://localhost:3000/images/random.cat',
      imgSrc : '',
      apiResult: null,
    }
  },
  methods: {
    getApiData: function() {
      this.imgSrc = null;
      this.$store.commit('toggleIsLoadingResult');
      
      this.axios.get(this.url)
        .then(response => {
          
          this.imgSrc = response.data.file;
          this.apiResult = response.data;
        })
        .catch(() => console.log("Something went wrong."))
        .then(() => {
          this.$store.commit('toggleIsLoadingResult');
          this.setShowResult();
          this.setRequestUrlToShow(this.apiUrl);
        });
    },
  },
}
</script>


<style lang="scss" scoped>
</style>