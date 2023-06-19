<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <!-- <div class="mt-2">Value: {{ text }}</div> -->
    <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Search</b-button>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',

  data() {
    return {
        text: ''
    }
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>

