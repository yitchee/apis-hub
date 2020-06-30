<template>
  <div>
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    
    <div class="mb-4">
      <div>
        Owlbot is a free dictionary API. It returns details about a word, such as the definition, 
        pronunciation, and type. The result is returned in a JSON object. It also has a npm package 
        <a href="https://www.npmjs.com/package/owlbot-js"><code class="external-links">owlbot-js</code></a>.
      </div>
      <div>
        The API can be accessed through <code>https://owlbot.info/api/v4/dictionary/</code>. Owlbot needs to 
      authenticate the request with an API token which is passed down via the 
      request header, unlike most of the other APIs on this site which uses the URL query string. 
      For example, this app uses <a href="https://github.com/axios/axios" class="external-links">axios</a> 
      and JavaScript to fetch the data with the following code:
      <pre class="mt-2 text-xs bg-gray-300 p-4 rounded-md overflow-x-auto">
axios.get(`https://owlbot.info/api/v4/dictionary/[word]`, {
    headers: {
         'Authorization': `Token [API_KEY]`
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.send(error.message);
    });</pre>
      </div>
    </div>
    <div>
      <ApiKeyTag :requireKey="true"></ApiKeyTag>
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
import ApiHelper from '@/components/ApiHelper.vue';

import responseMixin from '@/mixins/responseMixin.js';


export default {
  name: 'OwlbotApi',
  mixins: [responseMixin],
  components: {
    VButton,
    VRequestResponse,
    VInput,
    ApiHeader,
    ApiKeyTag,
    ApiHelper
  },
  data: function() {
    return {
      title: 'Owlbot API',
      apiWebsiteLink: 'https://owlbot.info/',
      apiUrl: 'https://owlbot.info/api/v4/dictionary/',
      url: 'http://localhost:3000/dictionaries/owlbot?',
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
      let finalUrl = this.apiUrl + `${this.word}`;
      return finalUrl;
    }
  }
}
</script>


<style>

</style>