<template>
  <div>
    <br><br><br>
    <h3>Your favorite games are:</h3>
    <br><br>
    <FutureGames 
    :games="this.games"
    :fields="this.fields"
    :selected="this.selected">
    </FutureGames>
    <p>
      <b-button size="sm" @click="selectAllRows">Select all</b-button>
      <b-button size="sm" @click="clearSelected">Clear selected</b-button>
      <b-button size="sm" @click="removefromfavorites">click to remove games from favotire</b-button>
    </p>
    <p>
      Selected Rows:<br>
      {{ selected }}
    </p>
  </div>
</template>

<script>
import FutureGames from '../components/FutureGames.vue';
  export default {
  components: { FutureGames },
    data() {
        this.loadGames();
      return {
        fields: ['selected', 'date', 'hour', 'hostTeam', 'guestTeam', 'field'],
        games: this.games,
        selected: []
      }
    },
    methods: {
      onRowSelected(items) {
        this.selected = items
      },
      selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
      },
      clearSelected() {
        this.$refs.selectableTable.clearSelected()
      },
        removefromfavorites() {
        // Rows are indexed from 0, so the third row is index 2
        console.log(this.selected);
      },
    async loadGames(){
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteGames",
        );
        this.games = [];
        for(let i=0; i < response.data.length; i++){
          
          let homename = await this.axios.get(
          `http://localhost:3000/teams/teamName/${response.data[i].gamedetails[0].hometeamID}`,
          );
          let awayname = await this.axios.get(
          `http://localhost:3000/teams/teamName/${response.data[i].gamedetails[0].awayteamID}`,
          );

          // console.log(response.data[i].gamedetails[0].gameid);
          let game = {
          id: response.data[i].gamedetails[0].gameid,
          date: response.data[i].gamedetails[0].gamedate,
          hour: response.data[i].gamedetails[0].gametime.slice(11,19),
          hostTeam: homename.data,
          guestTeam: awayname.data,
          field: response.data[i].gamedetails[0].field
          }
          // console.log(game);
          this.games.push(game);
        }
      } catch (error) {
        console.log("There are no games in user favorites")
        this.games =  []
        return this.games
      }
    }
    }
  }
</script>

<style>
    button{
        margin: 2%;
        text-align: center;
    }
    p{
        text-align: center;
    }
</style>