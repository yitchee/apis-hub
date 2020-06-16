<template>
  <div>
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>

    <div>
      <ApiTag :requireKey="false"></ApiTag>
    </div>
    <ApiHelper />
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


export default {
  name: 'PicsumApi',
  mixins: [],
  components: {
    VButton,
    ImageView,
    ApiHeader,
    ApiHelper,
    ApiTag
  },
  data: function() {
    return {
      title: 'Lorem Picsum',
      apiWebsiteLink: 'https://picsum.photos/',
      url: 'https://picsum.photos/600/500/',
      imgSrc : '',
    }
  },
  methods: {
    getApiData: function() {
      this.imgSrc = '';
      this.$store.commit('toggleIsLoadingResult');
      
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
        .then(() => this.$store.commit('toggleIsLoadingResult'));
    },
  },
}
</script>


<style>

</style>