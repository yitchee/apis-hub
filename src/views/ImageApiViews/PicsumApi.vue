<template>
  <div>
    <h1>Shibe API Header</h1>
    <VButton @click.native="getApiData"></VButton>
    <ImageView v-bind:imgSrc="imgSrc" />
  </div>
</template>


<script>
import updateApiUrlMixin from '@/mixins/updateApiUrlMixin.js';
import VButton from '@/components/VButton.vue'
import ImageView from '@/components/ImageView.vue'

export default {
  name: 'PicsumApi',
  mixins: [updateApiUrlMixin],
  components: {
    VButton,
    ImageView
  },
  data: function() {
    return {
      url: 'https://picsum.photos/600/500/',
      imgSrc : '',
    }
  },
  methods: {
    getApiData: function() {
      this.imgSrc = '';

      fetch(this.url)
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
    },
  },
}
</script>


<style>

</style>