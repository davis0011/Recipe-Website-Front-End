<template>
        <b-modal
        id="modal"
        ref="modal"
        title="Submit Your Name"
        @show="resetModal"
        @hidden="$emit('close')"
        @ok="handleSubmit"
        >
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label="title" label-for="name-input" invalid-feedback="title is required">
            <b-form-input
                id="title-input"
                v-model="title"
                required
            ></b-form-input>
            </b-form-group>
            <b-form-group label="Time To Make:" label-for="readyInMinutes" invalid-feedback="time is required">
            <b-form-input
                type="number"
                id="readyInMinutes"
                v-model="readyInMinutes"
                required
            ></b-form-input>
            </b-form-group>
            <b-form-checkbox id="1" v-model="vegan" name="vegan" value="true" unchecked-value=false>Vegan</b-form-checkbox>
            <b-form-checkbox id="2" v-model="vegetarian" name="vegetarian" value=true unchecked-value=false>vegetarian</b-form-checkbox>
            <b-form-checkbox id="3" v-model="glutenFree" name="glutenFree" value="true" unchecked-value=false>gluten Free</b-form-checkbox>
            <b-form-group label="Servings" label-for="Servings" invalid-feedback="Servings is required">
            <b-form-input
                type="number"
                id="servings"
                v-model="servings"
                required
            ></b-form-input>
            </b-form-group>
            <b-form-textarea
                id="ingredients"
                placeholder="Ingredients"
                ref="ingredients"
                rows="3"
            ></b-form-textarea>
            <b-form-textarea
                id="instructions"
                placeholder="Instructions"
                ref="instructions"
                rows="3"
            ></b-form-textarea>
            
        </form>
        </b-modal>
</template>

<script>
export default {
    name: 'CreateRecipe',

    data() {
        return {
            title:"",
            readyInMinutes:0,
            vegan:false,
            vegetarian:false,
            glutenFree:false,
            servings:0,
            ingredients:[],
            instructions:[]

        };
    },

    mounted() {
        this.$nextTick(() => {
      this.$refs.modal.show();
    });
    },
      props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.modal.show();
        });
      } else {
        this.$refs.modal.hide();
      }
    },
  },

    methods: {
        checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.title=""
        this.readyInMinutes=0
        this.vegan = false
        this.vegetarian = false
        this.servings = 0
        this.glutenFree = false
        this.ingredients =[]
        this.instructions = []
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      modalshow() {
        this.$bvModal.show()
      },
      async handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.ingredients = this.$refs.ingredients.value.split('\n');
        this.instructions = this.$refs.instructions.value.split('\n');
        try {
        
        const response = await this.axios.post(
          "http://localhost:3000/users/createRecipe",
          {
            title: this.title,
            image: "",
            readyInMinutes: this.readyInMinutes,
            vegetarian: this.vegetarian,
            vegan: this.vegan,
            glutenFree: this.glutenFree,
            ingredients: this.ingredients,
            instructions: this.instructions,
            servings: this.servings,
            description: ""
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err.response);
        // this.form.submitError = err.response.data.message;
      }
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal')
        })
      }
    },
};
</script>

<style lang="scss" scoped>

</style>