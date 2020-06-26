<template>
  <div>
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div class="mb-4">
      <div>
        The OMDb API provides developers with a way to obtain basic information about movies and TV shows. 
        The data can be retrieved by searching titles or by IMDb IDs. Depending on the amount of results, 
        there could be a number of 'pages'.
      </div>
      <div>
        The API can be accessed through <code>http://www.omdbapi.com/?apikey=[yourkey]</code> followed by 
        the query parameters. Visit he <a :href="apiWebsiteLink" class="text-blue-500 hover:underline hover:text-blue-700">OMDb website</a> to 
        see all of the valid arguments. You can try it out below to see a working request.
      </div>
    </div>
    <div>
      <ApiTag :requireKey="true"></ApiTag>
    </div>
    <ApiHelper />
    <label for="VInput">Title</label>
    <div class="flex flex-wrap">
      <VInput @inputSubmit="getApiData" v-model="media_title" :inputId="'movie_title'" class="flex-none w-full" :placeholderText="'default value is \'Logan\''"></VInput>
      <div class="relative flex-none mr-8">
        <label>Type</label>
        <select v-model="media_type" class="block appearance-none w-full border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-500">
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <div class="mr-8">
        <label>Release Year</label>
        <VInputNumber v-model="release_year" class="flex-none" :placeholderText="'e.g. 2015 || Blank = all years'"></VInputNumber>
      </div>
      <div>
        <label>Results Page Number</label>
        <VInputNumber v-model="page" class="flex-none" :placeholderText="'1-100 || default = 1'"></VInputNumber>
      </div>
    </div>
    <VButton @clicked="getApiData"></VButton>
    <VRequestResponse :showResult="showResult" :requestUrl="finalUrlToShow" :apiResult="apiResult"></VRequestResponse>
  </div>
</template>


<script>
import ApiHeader from '@/components/ApiHeader.vue';
import VButton from '@/components/VButton.vue';
import VRequestResponse from '@/components/VRequestResponse.vue';
import VInput from '@/components/VInput.vue';
import VInputNumber from '@/components/VInputNumber.vue';
import ApiTag from '@/components/ApiTag.vue';
import ApiHelper from '@/components/ApiHelper.vue';

import responseMixin from '@/mixins/responseMixin.js';


export default {
  name: 'OmdbApi',
  mixins: [responseMixin],
  components: {
    ApiHeader,
    VButton,
    VRequestResponse,
    VInput,
    VInputNumber,
    ApiTag,
    ApiHelper
  },
  data: function() {
    return {
      title: 'OMDB - Open Movie Database API',
      apiWebsiteLink: 'https://www.omdbapi.com/',
      apiUrl: 'http://www.omdbapi.com/?',
      url: 'http://localhost:3000/tv-movies/omdb?',
      finalUrlToShow: '',
      apiResult: null,
      media_title: '',
      media_type: '',
      release_year: '',
      page: '',
    }
  },
  methods: {
    getApiData: function() {
      this.$store.commit('toggleIsLoadingResult');

      this.axios.get(this.requestUrl)
        .then(response => {
          this.apiResult = response.data;
          this.finalUrlToShow = this.urlToShow;
        })
        .catch(() => console.log("Something went wrong."))
        .then(() => {
          this.$store.commit('toggleIsLoadingResult');
          this.setShowResult();
        });
    },
    generateRequestUrl: function(baseUrl) {
      let finalUrl = baseUrl;
      if (this.media_title) {
        finalUrl += `s=${this.media_title}`;
      }
      else {
        finalUrl += `s=Logan`;
      }

      if (this.media_type) {
        finalUrl += `&type=${this.media_type}`;
      }
      if (this.release_year) {
        finalUrl += `&y=${this.release_year}`;
      }
      if (this.page) {
        if (this.page >=1 && this.page <=100) {
          finalUrl += `&page=${this.page}`
        }
      }
      return finalUrl;
    }
  },
  computed: {
    requestUrl: function() {
      let finalUrl = this.generateRequestUrl(this.url);
      return finalUrl;
    },
    urlToShow: function() {
      let finalUrl = this.generateRequestUrl(this.apiUrl) + `&apikey=<<API_KEY>>`;
      return finalUrl;
    }
  }
}
</script>


<style>

</style>