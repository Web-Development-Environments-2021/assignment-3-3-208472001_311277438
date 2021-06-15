<template>
  <div class="overall">

    <!-- <div v-if="this.player.length==0">
    Please enter the player id:
    <b-input-group prepend="Id:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" v-on:click="newSearch">Search</b-button>
      </b-input-group-append>
    </b-input-group>
    </div> -->
      <!-- Your search Query: {{ searchQuery }} -->
      <div v-if="found && this.player.length!=0">
        <h1 class="title">{{this.player.fullname }} Personal Page</h1>
        <br>
      <!-- My name is {{ this.player.fullname }}
      <br> -->
      I play in {{this.player.teamName}} team
      <br>
      My position is {{ this.player.position }}
      <br>
      Most of the people know me as {{this.player.commonName}}
      <br>
      My nationality is {{this.player.nationality}}
      <br>
      I was born on {{this.player.birthdate}}
      <br>
      I was born in {{this.player.birthcountry}}
      <br>
      My height is {{this.player.height}}
      <br>
      My weight is {{this.player.weight}}
      <br>
      <br>
      <img :src="this.player.image" width="10%" alt="">
      </div>

      <div v-if="this.player=='err'">
      <br>
        Sorry! There is no player with this id
      </div>
  </div>
  
</template>

<script>
export default {
name: "PlayerPage",
data() {
//    this.player = {};
//    this.search = false;
  //  this.res = false;
   
    return {
      // searchQuery:"",
      // player: "",
      // res: true
    };
  },
props: {
    player: {
        required: true
    },
    found: {
        required: true
    },
},
  methods: {
    // async searchById() {
    //   try {
    //     const response = await this.axios.get(
    //       `http://localhost:3000/players/playerDetails/${this.searchQuery}`,
    //       {
  
    //       }
    //     );

    //       this.player = {
    //         playerId: response.data.player_id,
    //         fullname: response.data.full_name,
    //         image: response.data.image,
    //         position: response.data.position,
    //         teamName: response.data.team_name,
    //         commonName: response.data.common_name,
    //         nationality: response.data.nationality,
    //         birthdate: response.data.birthdate,
    //         birthcountry: response.data.birthcountry,
    //         height: response.data.height,
    //         weight: response.data.weight
    //       };

    //   } catch (err) {
    //     this.res=false;
    //     this.player.length = 0;
    //   }
    // },

    // newSearch() {
    //   this.res = true;
    //   // this.player = {};
    //   this.searchById();
    // }

  },
mounted(){
    console.log("player page mounted")
  },
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