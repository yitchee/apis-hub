<template>
  <div>
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div class="mb-4">
      <div>
        Lorem Picsum is an random image API. To access this API, 
        use <code>https://picsum.photos/&lt;width&gt;/&lt;height&gt;</code>, where <em>width</em> and 
        <em>height</em> are the size of the image in pixels, and every request will return a different 
        picture with the dimensions specified in <code>.jpg</code> or <code>.webp</code> format. 
        Unlike the other APIs, Lorem Picum does not return a JSON response.
      </div>
      <div>
        There are more advanced features such as getting a greyscale, blurred, or seeding an image. They have a 
        full list of available options on their page.
      </div>
    </div>

    <div>
      <ApiKeyTag :requireKey="false"></ApiKeyTag>
    </div>
    <ApiHelper />

    <div class="flex flex-wrap flex-col mb-4">
      <div class="flex-none w-full flex flex-col sm:flex-col md:flex-row">
        <div class="flex-1">
          <label for="image_width">Width (px) <span class="required-label">*</span></label>
          <VInputNumber @inputSubmit="getApiData" v-model="imgWidth" :inputId="'image_width'"></VInputNumber>
        </div>
        <div class="flex-none w-4"></div>
        <div class="flex-1">
          <label for="image_height">Height (px) <span class="required-label">*</span></label>
          <VInputNumber @inputSubmit="getApiData" v-model="imgHeight" :inputId="'image_height'"></VInputNumber>
        </div>
      </div>
      
      <div class="flex-none flex w-full justify-around">
        <div class="flex flex-col items-center">
          <label for="grayscale">Grayscale</label>
          <input type="checkbox" v-model="imgGrayscale" id="grayscale-checkbox" >
        </div>
        <div class="flex flex-col items-center">
          <label for="grayscale" class="flex-none">Blur</label>
          <input type="checkbox" v-model="imgBlur" id="blur-checkbox" >
          <div v-if="imgBlur" class="flex flex-col">
            Intensity: {{imgBlurVal}}
            <input type="range" min="1" max="10" value="2" step="1" v-model="imgBlurVal">
          </div>
        </div>
      </div>
    </div>
    <VButton @clicked="getApiData"></VButton>
    <VRequestResponse :showResult="showResult" :requestUrl="finalUrlToShow"></VRequestResponse>
    <ImageView :imgSrc="imgSrc" />
  </div>
</template>


<script>
import VButton from '@/components/VButton.vue';
import VRequestResponse from '@/components/VRequestResponse.vue';
import ImageView from '@/components/ImageView.vue';
import ApiHeader from '@/components/ApiHeader.vue';
import ApiHelper from '@/components/ApiHelper.vue';
import ApiKeyTag from '@/components/ApiKeyTag.vue';
import VInputNumber from '@/components/VInputNumber.vue';

import responseMixin from '@/mixins/responseMixin.js';


export default {
  name: 'PicsumApi',
  mixins: [responseMixin],
  components: {
    VButton,
    VRequestResponse,
    ImageView,
    ApiHeader,
    ApiHelper,
    ApiKeyTag,
    VInputNumber,
  },
  data: function() {
    return {
      title: 'Lorem Picsum',
      apiWebsiteLink: 'https://picsum.photos/',
      apiUrl: 'https://picsum.photos/',
      url: 'https://picsum.photos/',
      imgSrc : '',
      imgWidth: 600,
      imgHeight: 500,
      imgGrayscale: false,
      imgBlur: false,
      imgBlurVal: 2,
    }
  },
  methods: {
    getApiData: function() {
      this.imgSrc = '';
      this.$store.commit('toggleIsLoadingResult');
      
      fetch(this.requestUrl)
        .then(response => response.blob())
        .catch(() => console.log("Something went wrong."))
        .then(images => {
            const reader = new FileReader();
            reader.readAsDataURL(images); 
            reader.onloadend = () => {
                let base64data = reader.result;
                this.imgSrc = base64data.toString();
            }
            this.setFinalRequestUrlToShow(this.urlToShow);
        })
        .then(() => {
          this.$store.commit('toggleIsLoadingResult');
          this.setShowResult();
        });
    },
  },
  computed: {
    requestUrl: function() {
      let finalUrl = this.url + `${this.imgWidth}/${this.imgHeight}/?`;
      if (this.imgGrayscale) {
        finalUrl += 'grayscale&';
      }
      if (this.imgBlur) {
        finalUrl += `blur=${this.imgBlurVal}`;
      }
      return finalUrl;
    },
    urlToShow: function() {
      let finalUrl = this.apiUrl + `${this.imgWidth}/${this.imgHeight}/?`;
      if (this.imgGrayscale) {
        finalUrl += 'grayscale&';
      }
      if (this.imgBlur) {
        finalUrl += `blur=${this.imgBlurVal}`;
      }
      return finalUrl;
    }
  }
}
</script>


<style scoped>
input:checked + svg {
  display: block;
}
</style>