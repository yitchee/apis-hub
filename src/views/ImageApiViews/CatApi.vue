<template>
  <div class="cat-api">
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div class="mb-4">
      This is a simple API that returns an object that contains a URL of the random cat picture. Simply 
      call <code>http://aws.random.cat/meow</code> and every request will return a different 
      picture. The available file extensions are <code>.jgp</code>, <code>.jpeg</code>, 
      <code>.png</code>, and <code>.gif</code> .
    </div>
    <div>
      <ApiTag :requireKey="false"></ApiTag>
    </div>
    <ApiHelper />
    <VButton @clicked="getApiData"></VButton>
    <VJsonResponse v-if="apiResult" :apiResult="apiResult"></VJsonResponse>
    <ImageView :imgSrc="imgSrc" />
  </div>
</template>


<script>
import VButton from '@/components/VButton.vue'
import VJsonResponse from '@/components/VJsonResponse.vue';
import ImageView from '@/components/ImageView.vue'
import ApiHeader from '@/components/ApiHeader.vue'
import ApiHelper from '@/components/ApiHelper.vue'
import ApiTag from '@/components/ApiTag.vue'


export default {
  name: 'CatApi',
  mixins: [],
  components: {
    VButton,
    ImageView,
    VJsonResponse,
    ApiHeader,
    ApiHelper,
    ApiTag
  },
  data: function() {
    return {
      title: 'Random.Cat API',
      apiWebsiteLink: 'https://random.cat',
      url: 'https://aws.random.cat/meow',
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
        .then(() => this.$store.commit('toggleIsLoadingResult'));
    },
  },
}
</script>


<style lang="scss" scoped>
</style>