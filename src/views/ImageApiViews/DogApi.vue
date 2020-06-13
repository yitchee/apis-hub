<template>
  <div>
    <h1>Dog API Header</h1>
    <VButton @click.native="getApiData"></VButton>
    <VJsonResponse v-if="apiResult != null" v-bind:apiResult="apiResult"></VJsonResponse>
    <ImageView v-bind:imgSrc="imgSrc" />
  </div>
</template>


<script>
import updateApiUrlMixin from '@/mixins/updateApiUrlMixin.js';
import VButton from '@/components/VButton.vue';
import VJsonResponse from '@/components/VJsonResponse.vue';
import ImageView from '@/components/ImageView.vue';

export default {
  name: 'DogApi',
  mixins: [updateApiUrlMixin],
  components: {
    VButton,
    ImageView,
    VJsonResponse,
  },
  data: function() {
    return {
      url: 'https://random.dog/woof.json',
      imgSrc : '',
      apiResult: null,
    }
  },
  methods: {
    getApiData: function() {
      this.imgSrc = ''
      this.axios.get(this.url)
        .then(response => {
          this.imgSrc = response.data.url;
          this.apiResult = response.data;
        })
        .catch(() => console.log("Something went wrong."));
    },
  },
}
</script>


<style>

</style>