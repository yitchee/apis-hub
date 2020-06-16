<template>
  <div>
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div>
      Lorem Picsum is an random image API. To access this API, 
      use <code>https://picsum.photos/&lt;width&gt;/&lt;height&gt;</code>, where <em>width</em> and 
      <em>height</em> are the size of the image in pixels, and every request will return a different 
      picture with the dimensions specified in <code>.jpg</code> or <code>.webp</code> format.
    </div>
    <div class="mb-4">
      There are more advanced features such as getting a greyscale, blurred, or seeding an image. They have a 
      full list of available options on their page.
    </div>
    <div>
      <ApiTag :requireKey="false"></ApiTag>
    </div>
    <ApiHelper />

    <div class="flex flex-col sm:flex-col md:flex-row">
      <div class="flex-1">
        <label for="image_width">Width (px)</label>
        <VInputNumber @inputSubmit="getApiData" v-model="imgWidth" :inputId="'image_width'"></VInputNumber>
      </div>
      <div class="flex-0 w-4"></div>
      <div class="flex-1">
        <label for="image_height">Height (px)</label>
        <VInputNumber @inputSubmit="getApiData" v-model="imgHeight" :inputId="'image_height'"></VInputNumber>
      </div>
    </div>
    
    <VButton @clicked="getApiData"></VButton>
    <ImageView :imgSrc="imgSrc" />
  </div>
</template>


<script>
import VButton from '@/components/VButton.vue'
import ImageView from '@/components/ImageView.vue'
import ApiHeader from '@/components/ApiHeader.vue'
import ApiHelper from '@/components/ApiHelper.vue'
import ApiTag from '@/components/ApiTag.vue'
import VInputNumber from '@/components/VInputNumber.vue';


export default {
  name: 'PicsumApi',
  mixins: [],
  components: {
    VButton,
    ImageView,
    ApiHeader,
    ApiHelper,
    ApiTag,
    VInputNumber,
  },
  data: function() {
    return {
      title: 'Lorem Picsum',
      apiWebsiteLink: 'https://picsum.photos/',
      url: 'https://picsum.photos/',
      imgSrc : '',
      imgWidth: 600,
      imgHeight: 500,
    }
  },
  methods: {
    getApiData: function() {
      this.imgSrc = '';
      this.$store.commit('toggleIsLoadingResult');
      
      fetch(this.apiUrl)
        .then(response => response.blob())
        .catch(() => console.log("Something went wrong."))
        .then(images => {
            const reader = new FileReader();
            reader.readAsDataURL(images); 
            reader.onloadend = () => {
                let base64data = reader.result;
                this.imgSrc = base64data.toString();
            }
        })
        .then(() => this.$store.commit('toggleIsLoadingResult'));
    },
  },
  computed: {
    apiUrl: function() {
      return this.url + `${this.imgWidth}/${this.imgHeight}/`;
    }
  }
}
</script>


<style scoped>
</style>