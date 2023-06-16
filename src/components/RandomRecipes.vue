<template>
    <div class="row">
        <RecipePreview
        v-for="r in recipes"
        :recipe="{
            id:r.id,
            title:r.title,
            readyInMinutes:r.readyInMinutes,
            image:r.image,
            aggregateLikes:r.aggregateLikes,
            key:r.id}"
        :key="r.id"
        
        >
        </RecipePreview>
    </div>
</template>

<script>
import RecipePreview from './RecipePreview.vue'
export default {
    name: 'RandomRecipes',
    components:{
        RecipePreview,
    },
    data(){
        return{
           recipes: [],
        }
    },
    mounted(){
        // this.updateRecipes();
    },
    methods:{
        // async updateRecipes(){
        //     try{
        //         const response = await this.axios.get("http://localhost:3000/recipes/rand",
        //         );
        //         const recipes = response.data.map((r)=>{
        //             return{
        //                 id:r.id,
        //                 title: r.title,
        //                 readyInMinutes:r.readyInMinutes,
        //                 image:r.image,
        //                 aggregateLikes:r.aggregateLikes,
        //             };
        //         });
        //         this.recipes = [];
        //         this.recipes.push(...recipes);
        //     }catch(error){
        //         console.log(error);
        //     }
        // }
    }
};
</script>

<style lang="scss" scoped>

</style>