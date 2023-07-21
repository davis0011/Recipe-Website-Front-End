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
    <div class="search-button-container">
      <b-button pill
        type="submit"
        variant="primary"
        style="width: 250px;"
        class="ml-5 w-75"
        size="lg"
        @click="handleSubmit"
      >
        Search
      </b-button>
    </div>
    <div class="sort-buttons" v-if="this.res">
      <span @click="sortBy('popularity')">Sort by Popularity</span>
      <span @click="sortBy('time')">Sort by Time</span>
    </div>
    <div class="recipe-grid" v-if="this.res">
    <RecipePreview
      v-for="r in recipes"
      :recipe="{
        id: r.id,
        title: r.title,
        readyInMinutes: r.readyInMinutes,
        image: r.image,
        aggregateLikes: r.aggregateLikes,
        viewed: r.viewed,
        favorite: r.favorite,
        glutenFree: r.glutenFree,
        vegan: r.vegan,
        vegetarian: r.vegetarian,
        key: r.id,
      }"
      :key="r.id"
    ></RecipePreview>
  </div>
  <div v-else>
    No result found :(
  </div>
  </div>
</template>

<script>
import RecipePreview from '../components/RecipePreview.vue';

export default {
  name: 'SearchPage',
  components:{
      RecipePreview,
  },
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
        ],
        res:false,
        recipes:[]
    }
  },

  mounted() {
    
  },
  created(){
    const recipes = []
    if(this.$root.store.lastsearch !== []){
      this.recipes = this.$root.store.lastsearch
      this.res = true;
    }
    else{
      this.recipes =[];
      this.res = false;
    }
  },

  methods: {
    sortBy(type) {
      if (type === 'popularity') {
        // Sort the recipes by popularity
        this.recipes.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      } else if (type === 'time') {
        // Sort the recipes by time
        this.recipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      }
    },
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
        const c = this.cuisineSelected ? this.cuisineSelected : ""
        const d = this.dietSelected ? this.dietSelected : ""
        const i = this.intoleranceSelected ? this.intoleranceSelected : ""
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
          const recipes = response.data.map((r)=>{
                    return{
                        id:r.id,
                        title: r.title,
                        readyInMinutes:r.readyInMinutes,
                        image:r.image,
                        aggregateLikes:r.popularity,
                        viewed:r.viewed,
                        favorite:r.favorite,
                        glutenFree:r.glutenFree,
                        vegan:r.vegan,
                        vegetarian:r.vegetarian
                    };
                });
                this.recipes = [];
                this.recipes.push(...recipes);
        
        this.res = true
        console.log(!this.$root.store.username)
        if(this.$root.store.username && this.recipes.length != 0){
          this.$root.store.lastsearch = this.recipes;
        }
        try{}
       catch (err) {
        console.log(err.response);
      }
      }
  },
  
};
</script>

<style lang="scss" scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; 
  margin-top: 20px; 
}
.sort-buttons {
  
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.search-button-container {
  display: flex;
  justify-content: center;
}
.sort-buttons span {
  margin: 0 10px;
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}

</style>