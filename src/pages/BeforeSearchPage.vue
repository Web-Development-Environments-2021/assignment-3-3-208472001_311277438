<template>
  <div class="search">
    <h1 class="title">Search Page</h1>
    I want to search by:
    <br>
    <br>
    <b-button style='margin-right:10px' variant="outline-info" :to="{ name: 'search' }">Name</b-button>
    <b-button variant="outline-info" href="#">Id</b-button>
    <!-- <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success">Search</b-button>
      </b-input-group-append>
    </b-input-group>
      <br/>
      Your search Query: {{ searchQuery }} -->
  </div>
</template>

<script>
export default {
 data() {
    return {
    //   searchQuery:""
    };
  },
}
</script>

<style scoped>
.search {
    /* height:100px; */
    /* width:200px; */
    text-align:center;
}
</style>