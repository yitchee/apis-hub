<template>
  <div class="tmdb-api">
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div class="mb-4">
      <div>
        The TMDb API provides developers with a way to obtain detailed information about movies, TV shows, people 
        and more. Visit the <a :href="apiWebsiteLink" class="external-links" target="_blank">TMDb website</a> to 
        see the full list of features.
      </div>
      <div>
        You can try it out below to see a working request for a basic search using this API.
      </div>
    </div>
    <div>
      <ApiKeyTag :requireKey="true"></ApiKeyTag>
    </div>
    <ApiHelper />

    <ul class="flex border-b">
      <li class="mr-1 tab" :class="{'active-tab': isTabActive(TabEnum.movies)}" @click.prevent="setTabActive(TabEnum.movies)">
        <a class="tab" href="">Movies</a>
      </li>
      <li class="mr-1 tab" :class="{'active-tab': isTabActive(TabEnum.tv)}" @click.prevent="setTabActive(TabEnum.tv)">
        <a class="tab" href="">TV</a>
      </li>
      <li class="mr-1 tab" :class="{'active-tab': isTabActive(TabEnum.people)}" @click.prevent="setTabActive(TabEnum.people)">
        <a class="tab" href="">People</a>
      </li>
    </ul>

    <div class="p-4 border-l border-r">
      <div id="tmdb-movies-tab" v-if="isTabActive(TabEnum.movies)" class="flex flex-wrap">
        <div class="flex-none w-full">
          <label for="movie_title">Movie Title <span class="required-label">*</span></label>
          <VInput @inputSubmit="getApiData" v-model="movie_title" :inputId="'movie_title'" :placeholderText="'Movie Title'"></VInput>
        </div>
        <div class="w-full md:w-2/5 sm:mr-0 md:mr-8">
          <label for="movie_year">Release Year</label>
          <VInputNumber v-model="movie_year" :inputId="'movie_year'" :placeholderText="'e.g. 1998 / 2017'"></VInputNumber>
        </div>
        <div class="w-full md:w-2/5 sm:mr-0 md:mr-8">
          <label for="movie_year">Result Page Number</label>
          <VInputNumber v-model="movie_page" :inputId="'movie_page'" :placeholderText="'1-1000'"></VInputNumber>
        </div>
        <VButton @clicked="getApiData" class="w-full"></VButton>
        <VRequestResponse :showResult="showResultMovie" :requestUrl="finalUrlMovie" :apiResult="apiResultMovie"></VRequestResponse>
      </div>

      <div id="tmdb-tv-tab" v-if="isTabActive(TabEnum.tv)" class="flex flex-wrap">
        <div class="flex-none w-full">
          <label for="tv_title">TV Title <span class="required-label">*</span></label>
          <VInput @inputSubmit="getApiData" v-model="tv_title" :inputId="'tv_title'"></VInput>
        </div>
        <div class="w-full md:w-2/5 sm:mr-0 md:mr-8">
          <label for="tv_year">First Aired Year</label>
          <VInput @inputSubmit="getApiData" v-model="tv_year" :inputId="'tv_year'" :placeholderText="'e.g. 1998 / 2017'"></VInput>
        </div>
        <div class="w-full md:w-2/5 sm:mr-0 md:mr-8">
          <label for="tv_page">Result Page Number</label>
          <VInputNumber v-model="tv_page" :inputId="'tv_page'" :placeholderText="'1-1000'"></VInputNumber>
        </div>
        <VButton @clicked="getApiData" class="w-full"></VButton>
        <VRequestResponse :showResult="showResultTv" :requestUrl="finalUrlTv" :apiResult="apiResultTv"></VRequestResponse>
      </div>

      <div id="tmdb-people-tab" v-if="isTabActive(TabEnum.people)" class="flex flex-wrap">
        <div class="flex-none w-full">
          <label for="person_name">Person Name <span class="required-label">*</span></label>
          <VInput @inputSubmit="getApiData" v-model="person_name" :inputId="'person_name'"></VInput>
        </div>
        <div class="w-full md:w-1/2 sm:mr-0 md:mr-8">
          <label for="person_page">Result Page Number</label>
          <VInputNumber v-model="person_page" :inputId="'person_page'" :placeholderText="'1-1000'"></VInputNumber>
        </div>
        <VButton @clicked="getApiData" class="w-full"></VButton>
        <VRequestResponse :showResult="showResultPeople" :requestUrl="finalUrlPeople" :apiResult="apiResultPeople"></VRequestResponse>
      </div>
    </div>
  </div>
</template>


<script>
import ApiHeader from '@/components/ApiHeader.vue';
import VButton from '@/components/VButton.vue';
import VRequestResponse from '@/components/VRequestResponse.vue';
import VInput from '@/components/VInput.vue';
import VInputNumber from '@/components/VInputNumber.vue';
import ApiHelper from '@/components/ApiHelper.vue';
import ApiKeyTag from '@/components/ApiKeyTag.vue';

import responseMixin from '@/mixins/responseMixin.js';


const TabEnum = Object.freeze({
  'movies': 1,
  'tv': 2,
  'people': 3,
});

export default {
  name: 'TmdbApi',
  mixins: [responseMixin],
  components: {
    ApiHeader,
    VButton,
    VRequestResponse,
    VInput,
    VInputNumber,
    ApiHelper,
    ApiKeyTag
  },
  data: function() {
    return {
      title: 'TMDB - The Movie Database Api',
      apiWebsiteLink: 'https://developers.themoviedb.org/3',
      apiUrl: 'https://api.themoviedb.org/3/search/',
      url: 'http://localhost:3000/tv-movies/tmdb/',
      apiResultMovie: null,
      apiResultTv: null,
      apiResultPeople: null,
      showResultMovie: false,
      showResultTv: false,
      showResultPeople: false,
      finalUrlMovie: '',
      finalUrlTv: '',
      finalUrlPeople: '',
      movie_title: 'Logan',
      movie_year: null,
      movie_page: null,
      tv_title: 'Mr Robot',
      tv_year: null,
      tv_page: null,
      person_name: 'Hugh',
      person_page: null,
      activeTab: TabEnum.movies,
      TabEnum
    }
  },
  methods: {
    getApiData: function() {
      this.$store.commit('toggleIsLoadingResult');

      this.axios.get(this.requestUrl)
        .then(response => {
          switch (this.activeTab) {
            case TabEnum.movies:
              this.apiResultMovie = response.data;
              this.finalUrlMovie = this.urlToShow;
              break;
            case TabEnum.tv:
              this.apiResultTv = response.data;
              this.finalUrlTv = this.urlToShow;
              break;
            case TabEnum.people:
              this.apiResultPeople = response.data;
              this.finalUrlPeople = this.urlToShow;
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.log("Something went wrong.");
          console.log(error)
        })
        .then(() => {
          this.$store.commit('toggleIsLoadingResult');
          switch (this.activeTab) {
            case TabEnum.movies:
              this.showResultMovie = true;
              break;
            case TabEnum.tv:
              this.showResultTv = true;
              break;
            case TabEnum.people:
              this.showResultPeople = true;
              break;
            default:
              break;
          }
          
        });
    },
    generateRequestUrl: function(baseUrl) {
      let finalUrl = baseUrl;

      switch (this.activeTab) {
        case TabEnum.movies:
          finalUrl += `movie?query=${this.movie_title}`;

          if (!isNaN(this.movie_year) && this.movie_year) {
            finalUrl += `&primary_release_year=${this.movie_year}`;
          }
          if (!isNaN(this.movie_page) && this.movie_page) {
            finalUrl += `&page=${this.movie_page}`;
          }
          break;
        case TabEnum.tv:
          finalUrl += `tv?query=${this.tv_title}`;

          if (!isNaN(this.tv_year) && this.tv_year) {
            finalUrl += `&first_air_date_year=${this.tv_year}`;
          }
          if (!isNaN(this.tv_page) && this.tv_page) {
            finalUrl += `&page=${this.tv_page}`;
          }
          break;
        case TabEnum.people:
          finalUrl += `people?query=${this.person_name}`;

          if (!isNaN(this.person_page) && this.person_page) {
            finalUrl += `&page=${this.person_page}`;
          }
          break;
        default:
          break;
      }
      return finalUrl.trim();
    },
    isTabActive: function(tabItem) {
      return this.activeTab === tabItem;
    },
    setTabActive (tabItem) {
      this.activeTab = tabItem;
    }
  },
  computed: {
    requestUrl: function() {
      let finalUrl = this.generateRequestUrl(this.url);
      return finalUrl;
    },
    urlToShow: function() {
      let finalUrl = this.generateRequestUrl(this.apiUrl) + `&api_key=[API_KEY]`;
      finalUrl = this.formatUrlToShow(finalUrl);
      return finalUrl;
    }
  }
}
</script>


<style lang="scss">
.tmdb-api li.tab {
  &.active-tab {
    @apply -mb-px;
    a {
      @apply border-l border-t border-r rounded-t text-blue-700 font-semibold;
    }
  }

  a {
    @apply inline-block bg-white py-2 px-4 text-blue-500 font-semibold;
    &:hover {
      @apply text-blue-800;
    }
  }
}
</style>