<template>
  <div>
    <ApiHeader :title="title" :apiWebsiteLink="apiWebsiteLink"></ApiHeader>
    <div>
      <ApiTag :requireKey="true"></ApiTag>
    </div>
    <ApiHelper />

    <label for="word">Search Definition:</label>
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
  name: 'OwlbotApi',
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
      title: 'Owlbot API',
      apiWebsiteLink: 'https://owlbot.info/',
      apiKey: process.env.VUE_APP_API_KEY_OWLBOT,
      url: 'https://owlbot.info/api/v4/dictionary/',
      apiResult: null,
      word: '',
    }
  },
  methods: {
    getApiData: function() {
      this.$store.commit('toggleIsLoadingResult');

      this.axios.get(this.apiUrl, {
        headers: {
          'Authorization': `Token ${this.apiKey}`
        }
        })
        .then(response => {
          this.apiResult = response.data;
        })
        .catch(() => this.apiResult = {error: "Something went wrong!"})
        .then(() => this.$store.commit('toggleIsLoadingResult'));
    }
  },
  computed: {
    apiUrl: function() {
      return this.url + this.word;
    }
  }
}
</script>


<style>

</style>