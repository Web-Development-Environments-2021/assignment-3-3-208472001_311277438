<template>
<div>
  <div v-if="games != []">
    <GamePreview
      v-for="g in games"
      :id="g.id"
      :date="g.date"
      :hour="g.hour"
      :hostTeam="g.hostTeam" 
      :guestTeam="g.guestTeam"
      :field="g.field"
      :key="g.id"></GamePreview>
    </div>
  <div class="game-preview" v-else>
      there are no favorite games in your profile
    </div>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    this.updateGames();
    return {
      games: this.games
        // {
        //   id: 123,
        //   date: "27/5/21",
        //   hour: "20:00",
        //   hostTeam: "Maccabi Tel-Aviv",
        //   guestTeam: "Hapoel Beer-Sheva",
        //   field: "Bloomfield"
        // },
        // {
        //   id: 124,
        //   date: "27/5/21",
        //   hour: "20:00",
        //   hostTeam: "Maccabi Tel-Aviv",
        //   guestTeam: "Hapoel Beer-Sheva",
        //   field: "Bloomfield"
        // },
        // {
        //   id: 125,
        //   date: "27/5/21",
        //   hour: "20:00",
        //   hostTeam: "Maccabi Tel-Aviv",
        //   guestTeam: "Hapoel Beer-Sheva",
        //   field: "Bloomfield"
        // }
      // ]
    };
  },
  methods: {
    async updateGames(){
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteGames",
        );
        this.games = new Array(response.data.length);
        // console.log("!111111111111");
        for(let i=0; i < response.data.length; i++){
          
          // const response3 = await this.axios.get(
          // `http://localhost:3000/teams/teamDetails/${response.data[i].gamedetails[0].hometeamID}`,
          // );
          // console.log(response5.data.players[0].team_name);
          // const response4 = await this.axios.get(
          // `http://localhost:3000/teams/teamDetails/${response.data[i].gamedetails[0].awayteamID}`,
          // );
          // console.log(response3.data.players[0].team_name);

          let game = {
          id: response.data[i].gamedetails[0].gameid,
          // date: response.data[i].gamedetails[0].gamedate,
          hour: response.data[i].gamedetails[0].gametime.slice(11,19),
          // hostTeam: response3.data.players[0].team_name,
          // guestTeam: response4.data.players[0].team_name,
          hostTeam: response.data[i].gamedetails[0].hometeamID,
          guestTeam: response.data[i].gamedetails[0].awayteamID,
          field: response.data[i].gamedetails[0].field
          }
          this.games[i] = game;
        }
      } catch (error) {
        console.log("There are no games in user favorites")
        this.games =  []
        return this.games
      }
    }
  },
};
</script>

<style></style>
