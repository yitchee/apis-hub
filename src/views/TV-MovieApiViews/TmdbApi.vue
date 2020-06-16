<template>
  <div>
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div>
      <ApiTag :requireKey="true"></ApiTag>
    </div>
    <ApiHelper />
    <label for="movie_title">Movie Title</label>
    <VInput @inputSubmit="getApiData" v-model="movie_title" :inputId="'movie_title'"></VInput>
    <VButton @clicked="getApiData"></VButton>
    <VJsonResponse v-if="apiResult" :apiResult="apiResult"></VJsonResponse>
  </div>
</template>


<script>
import ApiHeader from '@/components/ApiHeader.vue'
import VButton from '@/components/VButton.vue';
import VJsonResponse from '@/components/VJsonResponse.vue';
import VInput from '@/components/VInput.vue';
import ApiHelper from '@/components/ApiHelper.vue';
import ApiTag from '@/components/ApiTag.vue';


export default {
  name: 'TmdbApi',
  mixins: [],
  components: {
    ApiHeader,
    VButton,
    VJsonResponse,
    VInput,
    ApiHelper,
    ApiTag
  },
  data: function() {
    return {
      title: 'TMDB - The Movie Database Api',
      apiWebsiteLink: 'https://www.themoviedb.org/documentation/api',
      apiKey: process.env.VUE_APP_API_KEY_TMDB,
      url: ' https://api.themoviedb.org/3/search/movie?',
      apiResult: null,
      movie_title: '',
    }
  },
  methods: {
    getApiData: function() {
      this.$store.commit('toggleIsLoadingResult');

      this.axios.get(this.apiUrl)
        .then(response => {
          this.apiResult = response.data;
        })
        .catch(() => console.log("Something went wrong."))
        .then(() => this.$store.commit('toggleIsLoadingResult'));
    },
  },
  computed: {
    apiUrl: function() {
      let queryUrl = '';
      if (this.movie_title)
        queryUrl += `query=${this.movie_title}&`
      return this.url + queryUrl + `api_key=${this.apiKey}&`;
    }
  }
}
</script>


<style>

</style>