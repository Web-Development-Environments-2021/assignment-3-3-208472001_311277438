<template>
  <div class="overall">
    <h1 class="title">Coach Personal Page</h1>
    <br>
    <div v-if="this.coach.length==0">
    Please enter the coach id:
    <b-input-group prepend="Id:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" v-on:click="newSearch">Search</b-button>
      </b-input-group-append>
    </b-input-group>
    </div>
      <!-- Your search Query: {{ searchQuery }} -->
      <div v-if="this.coach.length!=0">
      <!-- Results for player id {{ this.player.playerId }}:
      <br> -->
      My name is {{ this.coach.fullname }}
      <br>
      I coach in {{this.coach.teamName}} team
      <br>
      Most of the people know me as {{this.coach.commonName}}
      <br>
      My nationality is {{this.coach.nationality}}
      <br>
      I was born on {{this.coach.birthdate}}
      <br>
      I was born in {{this.coach.birthcountry}}
      <br>
      <img :src="this.coach.image" width="10%" alt="">
      </div>
      <div v-if="!this.res && this.coach.length==0">
       Results:
      <br>
        Sorry! There is no coach with this id
      </div>
  </div>
  
</template>

<script>
export default {
 data() {
   this.coach = {};
   this.res = false;
   
    return {
      searchQuery:"",
      coach: "",
      res: true
    };
  },
  methods: {
    async searchById() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/coaches/coachDetails/${this.searchQuery}`,
          {
  
          }
        );

          this.coach = {
            coachId: response.data.coach_id,
            fullname: response.data.full_name,
            image: response.data.image,
            teamName: response.data.team_name,
            commonName: response.data.common_name,
            nationality: response.data.nationality,
            birthdate: response.data.birthdate,
            birthcountry: response.data.birthcountry,
          };

      } catch (err) {
        this.res=false;
        this.coach.length = 0;
      }
    },

    newSearch() {
      this.res = true;
      // this.player = {};
      this.searchById();
    }

  }
}


</script>

<style scoped>

#search-input {
  margin: auto;
  width: 300px;
  padding: 10px;
  align-items: center;
}

.overall {
  text-align: center;
}
</style>