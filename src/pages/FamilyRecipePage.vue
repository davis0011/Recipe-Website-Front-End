<template>
  <div class="container">
    <div v-if="this.recipes.length!=0">
    <div v-for="recipe in recipes" :key="recipe.id">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <b-card class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Occasion {{ recipe.occasion }} </div>
              <div>origin {{ recipe.origin }}</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index"
              >
                {{ r }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ul>
              <li
                v-for="(r, index) in recipe.instructions.split(',').filter(Boolean)"
                :key="index"
              >
                {{ r }}
              </li>
            </ul>

          </div>
        </div>
      </b-card>
      <br>
    <hr>
    <br>
    </div>
    </div>
    <div v-else>Steps to set up family recipes: <br>
        1. get family <br>
        2. define in assigment a way for users to insert family recipes <br>
        3. ??? <br>
        4. family recipe :))))))
    </div>
  </div>
</template>

<script>
export default {
    name: 'FamilyRecipePage',

    data() {
        return {
            recipes:[]
            
        };
    },

    mounted() {
        this.getfamily()
    },

    methods: {
        async getfamily(){
            try{
                const response = await this.axios.get("http://localhost:3000/users/family",
                );
                const recipes = response.data.map((r)=>{
                    return{
                        id:r.recipe_id,
                        title: r.title,
                        readyInMinutes:r.readyInMinutes,
                        image:r.image,
                        occasion:r.occasion,
                        origin:r.origin,
                        ingredients:r.ingredients,
                        instructions:r.instructions
                    };
                });
                this.recipes = [];
                this.recipes.push(...recipes);
                console.log(recipes)
            }catch(error){
                console.log(error);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.recipe-body{
    opacity: 0.8;
}
</style>