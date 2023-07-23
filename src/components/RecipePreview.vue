<template>
  <div class="column">
    <b-card-group deck>
      <b-card
      bg-variant="defult"
      border-variant="light"
      tag="article"
      class="mb-2"
      >
      <router-link 
      :to="recipe.own ? { name: 'ownrec', params: { recipeId: recipe.id } } 
      : { name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
      <b-card-img-lazy :src="recipe.image" alt="Image" class="custom-card-img" top></b-card-img-lazy>
      <b-card-title :class="{ 'purple-text': recipe.viewed }">{{recipe.title}}</b-card-title>
      </router-link>
      <div class="recipe-info">
          <div class="recipe-favorite" v-if="$root.store.username && !recipe.own">
            <span class="likes">Popularity: {{ recipe.aggregateLikes }}</span>
            <img v-if="this.heart" class="heart-icon" :src="require('@/assets/h1.png')">
            <img v-else class="heart-icon-hollow" :src="require('@/assets/h2.png')" @click="makeFavorite()">

          </div>
          <div class="recipe-icons">
            <i class="fas fa-clock"></i> {{ recipe.readyInMinutes }} minutes
            <i class="gluten">{{ recipe.glutenFree ? 'Gluten-Free' : 'Has Gluten' }}</i>
          </div>
            <span align="center" class="veg">
            <i v-if="recipe.vegan">vegan</i>
            <i v-else-if="recipe.vegetarian">vegetarian</i>
            </span>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import h1 from '../assets/h1.png';
import h2 from '../assets/h2.png';
export default {
  name:"RecipePriview",
  mounted() {
    this.heart = this.recipe.favorite;
    // this.axios.get(this.recipe.image).then((i) => {
    //   this.image_load = true;
    // });
  },
  data() {
    return {
      image_load: false,
      heart : false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
  },
      methods: {
    async makeFavorite() {
      console.log(this.recipe.id)
      try {
        const response = await this.axios.post("http://localhost:3000/users/favorites",

          {
            recipeId:this.recipe.id
          }
        );
        this.recipe.favorite = true
        this.heart = true
        console.log(response);
      } catch (err) {
        console.log(err.response);
      }
    },
  },

};
</script>

<style scoped>
/* .recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
} */
.recipe-preview > .recipe-body {
  width: 100%;
  /* height: 200px; */
  position: relative;
}
.veg{
  float: center;
  color: rgb(51, 179, 0);
}
.heart-icon{
  width: 10%;
  /* height: 5vh; */
  float: right;
}
.heart-icon-hollow{
  width: 10%;
  /* height: 5vh; */
  float: right;
  cursor: pointer;

}
.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.purple-text {
  color: #551A8B;
  font-weight: bold;
  text-decoration-color: #551A8B;
  text-decoration-thickness: 2px;
  text-decoration-style: solid;
}

.purple-text:hover {
  text-decoration-color: inherit;
}
.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}
.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}
.gluten{
  float: right;
}
.custom-card-img {
  object-fit: cover;
  height: 200px;
}
.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
.row {
  display: flex;
}

.column {
  flex: 1;
  margin-right: 20px;
}
.column:last-child {
  margin-right: 0;
}
</style>
