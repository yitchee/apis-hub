<template>
  <div>
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>

    <div>
      <ApiTag :requireKey="true"></ApiTag>
    </div>
    <ApiHelper />
    <label for="VInput">Movie Title</label>
    <VInput @inputSubmit="getApiData" v-model="movie_title" :inputId="'movie_title'"></VInput>
    <VButton @clicked="getApiData"></VButton>
    <VJsonResponse v-if="apiResult" :apiResult="apiResult"></VJsonResponse>
  </div>
</template>


<script>
import ApiHeader from '@/components/ApiHeader.vue';
import VButton from '@/components/VButton.vue';
import VJsonResponse from '@/components/VJsonResponse.vue';
import VInput from '@/components/VInput.vue';
import ApiTag from '@/components/ApiTag.vue';
import ApiHelper from '@/components/ApiHelper.vue';


export default {
  name: 'OmdbApi',
  mixins: [],
  components: {
    ApiHeader,
    VButton,
    VJsonResponse,
    VInput,
    ApiTag,
    ApiHelper
  },
  data: function() {
    return {
      title: 'OMDB - Open Movie Database API',
      apiWebsiteLink: 'https://www.omdbapi.com/',
      apiKey: process.env.VUE_APP_API_KEY_OMDB,
      url: 'http://www.omdbapi.com/?',
      apiResult: null,
      movie_title: '',
    }
  },
  methods: {
    getApiData: function() {
      this.$store.commit('toggleIsLoadingResult');

      this.axios.get(this.apiUrl + `s=${this.movie_title}`)
        .then(response => {
          this.apiResult = response.data;
        })
        .catch(() => console.log("Something went wrong."))
        .then(() => this.$store.commit('toggleIsLoadingResult'));
    },
  },
  computed: {
    apiUrl: function() {
      return this.url + `apikey=${this.apiKey}&`;
    }
  }
}
</script>


<style>

</style>