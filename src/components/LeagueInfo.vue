<template>
  <div id="block_container">
    <div class="league-preview">
      <b-card img-alt="Image" tag="article" style="max-width: 20rem;" class="mb-2">
      <b-card-title>{{leagueName}}</b-card-title>
      <b-card-text>
        Season: {{ season }}
        <br/>
        Stage: {{ stage }}
      </b-card-text>
      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
      </b-card>
    </div>
  <div class="league-preview">
      <b-card img-alt="Image" tag="article" style="max-width: 30rem;" class="mb-2">
      <b-card-title>Next Game</b-card-title>
      <b-card-text>
        date: {{ date }}
        <br/>
        hour: {{ hour }}
        <br>
        hostTeam: {{ hostTeam }}
        <br>
        guestTeam: {{ guestTeam }}
        <br>
        field: {{ field }}
      </b-card-text>
      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    </b-card>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    this.getDetails();
    
    return {
      leagueName: "", 
      season: "", 
      stage: "",
      nextgame: "",
      date: "",
      hour: "",
      hostTeam: "",
      guestTeam: "",
      field: ""
    }; 
  },
   methods: {
    async getDetails() {
      const response = await this.axios.get(
          "http://localhost:3000/league/getDetails",
        );
      this.leagueName = response.data.league_name;
      this.season = response.data.current_season_name;
      this.stage = response.data.current_stage_name;
      this.nextgame = response.data.nextgame[0];
      const response2 = await this.axios.get(
          `http://localhost:3000//teamDetails/${this.nextgame.hometeamID}`,
        );
      
      this.date = this.nextgame.gamedate;
      this.hour = this.nextgame.gametime;
      this.hostTeam = this.nextgame.hometeamID;
      this.guestTeam = this.nextgame.awayteamID;
      this.field = this.field;
    },
  }
};
</script>

<style>
.league-preview {
  display: inline-block;
  width: 300px;
  height: 220px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  padding: 0%;
  /* border-color:rgb(44, 89, 116); */
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(243, 245, 247);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}
b-card-text{
  border-block: white;
}

</style>