<template>
  <div>
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div>
      <ApiTag :requireKey="true"></ApiTag>
    </div>
    <ApiHelper />

    <label for="word">Word</label>
    <VInput @inputSubmit="getApiData" v-model="word" :inputId="'word'"></VInput>
    <VButton @clicked="getApiData"></VButton>
    <VJsonResponse v-if="apiResult" :apiResult="apiResult"></VJsonResponse>
  </div>
</template>


<script>
import VButton from '@/components/VButton.vue';
import VJsonResponse from '@/components/VJsonResponse.vue';
import VInput from '@/components/VInput.vue';
import ApiHeader from '@/components/ApiHeader.vue'
import ApiTag from '@/components/ApiTag.vue'
import ApiHelper from '@/components/ApiHelper.vue';


export default {
  name: 'MerriamWebsterApi',
  mixins: [],
  components: {
    VButton,
    VJsonResponse,
    VInput,
    ApiHeader,
    ApiTag,
    ApiHelper
  },
  data: function() {
    return {
      title: 'Merriam-Webster API',
      apiWebsiteLink: 'https://dictionaryapi.com/',
      apiKey: process.env.VUE_APP_API_KEY_MERRIAM_WEBSTER,
      url: 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/',
      apiResult: null,
      word: '',
    }
  },
  methods: {
    getApiData: function() {
      this.$store.commit('toggleIsLoadingResult');

      this.axios.get(this.apiUrl)
        .then(response => {
          this.apiResult = response.data;
        })
        .catch(() => this.apiResult = {error: "Something went wrong!"})
        .then(() => this.$store.commit('toggleIsLoadingResult'));
    }
  },
  computed: {
    apiUrl: function() {
      return this.url + `${this.word}?key=${this.apiKey}`;
    }
  }
}
</script>


<style>

</style>