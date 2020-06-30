<template>
  <div>
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div class="mb-4">
      <div>
        The Merriam-Webster Dictionary API gives developers access to a comprehensive resource of 
        dictionary and thesaurus content. They offer many different <a class="external-links" href="https://dictionaryapi.com/products/index">versions</a>. 
        APIs Hub uses the Merriam-Webster's Collegiate® Thesaurus version.
      </div>
      <div>
        Merriam-Webster returns very detailed information about a word or phrase, such as definitions, 
        synonyms, and antonyms. The base url is <code>https://www.dictionaryapi.com/api/v3/references/thesaurus/json/&lt;WORD&gt;</code>. 
        You can try it out below to see a valid request.
      </div>
    </div>
    <div class="flex flex-col sm:flex-row">
      <ApiKeyTag :requireKey="true" class="mb-1 sm:mb-0"></ApiKeyTag>
      <ApiLimitTag :limit="'1000 / day'"></ApiLimitTag>
    </div>
    <ApiHelper />

    <label for="word">Search Definition: <span class="required-label">*</span></label>
    <VInput @inputSubmit="getApiData" v-model="word" :inputId="'word'"></VInput>
    <VButton @clicked="getApiData"></VButton>
    <VRequestResponse :showResult="showResult" :requestUrl="finalUrlToShow" :apiResult="apiResult"></VRequestResponse>
  </div>
</template>


<script>
import VButton from '@/components/VButton.vue';
import VRequestResponse from '@/components/VRequestResponse.vue';
import VInput from '@/components/VInput.vue';
import ApiHeader from '@/components/ApiHeader.vue';
import ApiKeyTag from '@/components/ApiKeyTag.vue';
import ApiLimitTag from '@/components/ApiLimitTag.vue';
import ApiHelper from '@/components/ApiHelper.vue';

import responseMixin from '@/mixins/responseMixin.js';


export default {
  name: 'MerriamWebsterApi',
  mixins: [responseMixin],
  components: {
    VButton,
    VRequestResponse,
    VInput,
    ApiHeader,
    ApiKeyTag,
    ApiLimitTag,
    ApiHelper
  },
  data: function() {
    return {
      title: 'Merriam-Webster API',
      apiWebsiteLink: 'https://dictionaryapi.com/',
      apiUrl: 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/',
      url: 'http://localhost:3000/dictionaries/merriam-webster?',
      apiResult: null,
      word: '',
    }
  },
  methods: {
    getApiData: function() {
      this.$store.commit('toggleIsLoadingResult');

      this.axios.get(this.requestUrl)
        .then(response => {
          this.apiResult = response.data;
          this.setFinalRequestUrlToShow(this.urlToShow);
        })
        .catch(() => this.apiResult = {error: "Something went wrong!"})
        .then(() => {
          this.$store.commit('toggleIsLoadingResult');
          this.setShowResult();
        });
    }
  },
  computed: {
    requestUrl: function() {
      let finalUrl = this.url + `word=${this.word}`;
      return finalUrl;
    },
    urlToShow: function() {
      let finalUrl = this.apiUrl + `${this.word}?key=[API_KEY]`;
      return finalUrl;
    }
  }
}
</script>


<style>

</style>