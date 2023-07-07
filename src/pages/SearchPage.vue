<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <label for="text">Search</label>
    <div><b-form-input id="text" v-model="text" placeholder="Enter Food Query Here"></b-form-input></div>
    <br>
    <label for="cuisine">Cuisine</label>
    <div><b-form-select id="cuisine" v-model="cuisineSelected" :options="cuisine_options"></b-form-select></div>
    <br>
    <label for="diet">Diet</label>
    <div><b-form-select id="diet" v-model="dietSelected" :options="diet_options"></b-form-select></div>
    <br>
    <label for="intolerences">Intolerance</label>
    <div><b-form-select id="intolerences" v-model="intoleranceSelected" :options="intolerance_options"></b-form-select></div>
    <br>

    <label for="range-2"><div class="mt-2">Limit: {{ value }}</div></label>
    <b-form-input id="range-2" v-model="value" type="range" min="5" max="15" step="5" style="width: 30%;padding-left:20px;"></b-form-input>
    <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        @click="handleSubmit"
        >Search</b-button>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',

  data() {
    return { 
        text: '', // need Query, Limit, Intolerances, Diet, Cuisine
        value:5,
        cuisineSelected: null,
        dietSelected: null,
        intoleranceSelected: null,
        cuisine_options: [
          { value: null, text: 'All' },
          "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", 
          "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", 
          "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
        ],
        diet_options: [
          { value: null, text: 'Any' },
          "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", 
          "Primal", "Low FODMAP", "Whole30"
        ],
        intolerance_options: [
          { value: null, text: 'None' },
          "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"
        ]
    }
  },

  mounted() {
    
  },

  methods: {
    checkFormValidity() {
        const valid = this.text.trim() != ""
        this.nameState = valid
        return valid
      },
    async handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        const c = this.cuisineSelected ? [this.cuisineSelected] : []
        const d = this.dietSelected ? [this.dietSelected] : []
        const i = this.intoleranceSelected ? [this.intoleranceSelected] : []
        console.log(            {
              searchText: this.text,
              limit: this.value,
              cuisines: c,
              diets: d,
              intolerances: i
            })
        const response = await this.axios.get(
          "http://localhost:3000/recipes/searchRecipe",
          {
            headers: {
              searchText: this.text,
              limit: this.value,
              cuisines: c,
              diets: d,
              intolerances: i
            }
          })
        console.log(response);
        try {}
       catch (err) {
        console.log(err.response);
        // this.form.submitError = err.response.data.message;
      }
      }
  },
  
};
</script>

<style lang="scss" scoped>

</style>