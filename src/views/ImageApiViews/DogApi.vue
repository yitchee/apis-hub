<template>
  <div class="dog-api">
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div class="mb-4">
      This is a fast and basic API that returns an object containing a URL of a random dog picture and its file size. Simply 
      call <code>https://random.dog/woof.json</code> and every request will return a different response
      everytime. The available file extensions are <code>.jgp</code>, <code>.jpeg</code>, <code>.png</code>,  
      <code>.gif</code>, <code>.mp4</code>, and <code>.webm</code>.
    </div>
    <aside class="text-gray-500 italic text-sm mb-2">Note: .mp4 and .webm files won't be displyed properly on this site.</aside>
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
import VButton from '@/components/VButton.vue';
import VJsonResponse from '@/components/VJsonResponse.vue';
import ImageView from '@/components/ImageView.vue';
import ApiHeader from '@/components/ApiHeader.vue'
import ApiTag from '@/components/ApiTag.vue'
import ApiHelper from '@/components/ApiHelper.vue';


export default {
  name: 'DogApi',
  mixins: [],
  components: {
    VButton,
    ImageView,
    VJsonResponse,
    ApiHeader,
    ApiTag,
    ApiHelper
  },
  data: function() {
    return {
      title: 'Random.Dog API',
      apiWebsiteLink: 'https://random.dog',
      url: 'https://random.dog/woof.json',
      // url: 'http://localhost:3000',
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
          this.imgSrc = response.data.url;
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