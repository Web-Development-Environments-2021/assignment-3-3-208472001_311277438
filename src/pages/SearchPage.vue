<template>
  <div class="search">
    <div v-if="this.start">
    <h1 class="title">Search Page</h1>
    If you have a player/coach/team id,
    <br>
    you can find it's page by the following links:
    <br>
    <br>
    <b-button  variant="outline-info" @click="callPlayer">Player Personal Page</b-button>
    <br>
    <br>
    <b-button  variant="outline-info" :to="{ name: 'CoachPage' }">Coach Personal Page</b-button>
    <br>
    <br>
    <b-button variant="outline-info" :to="{ name: 'TeamPage' }">Team Home Page</b-button>
    <br>
    <br>
    <div class="mt-2">
    Otherwise,
    <router-link to="PlayerPage"> Search by name in here</router-link>
  </div>
  </div>

  <div v-if="this.choosePlayer && !this.search && !foundPlayer">
    <h1 class="title">Search Page</h1>
    Please enter the player id:
    <b-input-group prepend="Id:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" v-on:click="searchPlayer">Search</b-button>
      </b-input-group-append>
    </b-input-group>
    </div>

    <PlayerPage
    :player="this.player"
    :found="this.foundPlayer"
    ></PlayerPage>
  </div>  
</template>

<script>
import PlayerPage from "../components/PlayerPage";
export default {
  components: {
    PlayerPage, 
  },
 data() {
   this.start = true;
   this.choosePlayer = false;
   this.player = {};
   this.search = false;
   this.foundPlayer = false;

    return {
      start: true,
      choosePlayer: false,
      player: "",
      searchQuery:"",
    };
  },
  methods: {
    callPlayer(){
      this.choosePlayer = true;
      this.start = false;
    },
    async searchPlayer() {
      try {
        const response = await this.axios.get(
          `http://localhost:3000/players/playerDetails/${this.searchQuery}`,
          {
  
          }
        );

          this.player = {
            playerId: response.data.player_id,
            fullname: response.data.full_name,
            image: response.data.image,
            position: response.data.position,
            teamName: response.data.team_name,
            commonName: response.data.common_name,
            nationality: response.data.nationality,
            birthdate: response.data.birthdate,
            birthcountry: response.data.birthcountry,
            height: response.data.height,
            weight: response.data.weight
          };

          this.foundPlayer = true;

      } catch (err) {
        this.player = 'err';
      }
    },

    }
}
</script>

<style scoped>
.search {
    /* height:100px; */
    /* width:200px; */
    text-align:center;
}

#search-input {
  margin: auto;
  width: 300px;
  padding: 10px;
  align-items: center;
}

</style>