<template>
  <div>
    <h1 class="title">Search Page</h1>
    <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" v-on:click="searchById">Search</b-button>
      </b-input-group-append>
    </b-input-group>
      <br/>
      Your search Query: {{ searchQuery }}
  </div>
</template>

<script>
export default {
 data() {

    return {
      searchQuery:""
    };
  },
  methods: {
    async searchById() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/teams/teamDetails/${this.searchQuery}`,
          {
  
          }
        );
        // this.searchQuery = response.data.players
        alert(response);
      } catch (err) {
        alert(err.response.data);
        // alert(err.response.request.status);
        this.form.submitError = err.response.data.message;
      }
    },

  }
}
</script>

<style scoped>

#search-input {
  margin-left: 20px; 
  width: 500px; 
}
</style>