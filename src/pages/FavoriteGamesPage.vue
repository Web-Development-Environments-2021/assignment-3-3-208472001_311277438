<template>
  <div id="favorites">
    <br /><br /><br />
    <h3>Your favorite games are:</h3>
    <br /><br />
    <b-table id="table"
      :items="this.games"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
      <!-- Example scoped slot for select state illustrative purposes -->
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
    <p>
      <b-button size="sm" @click="removefromfavorites"
        >click to delete this game from your favotire games</b-button
      >
    </p>
  </div>
</template>

<script>
export default {
  data() {
    this.loadFavoriteGames();
    return {
      fields: ["selected", "date", "hour", "hostTeam", "guestTeam", "field"],
      games: this.games,
      selected: [],
      selectMode: "single",
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    async removefromfavorites() {
      // Rows are indexed from 0, so the third row is index 2
      try {
        
          let response = await this.axios.delete(
            `http://localhost:3000/users//favorites/Game/${this.selected[i].id}`
          );

          if(response.data == "Succeeded"){
            alert("That game was successfully removed from favorites");
            this.loadFavoriteGames();
          }else{
            alert("There was a problem with removing this game from favorites, please try again");
          }

      } catch (error) {
        console.log("There was a problem with deleting the game from favorites");
      }
    },
    async loadFavoriteGames() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteGames"
        );
        this.games = [];
        for (let i = 0; i < response.data.length; i++) {
          let homename = await this.axios.get(
            `http://localhost:3000/teams/teamName/${response.data[i].gamedetails[0].hometeamID}`
          );
          let awayname = await this.axios.get(
            `http://localhost:3000/teams/teamName/${response.data[i].gamedetails[0].awayteamID}`
          );

          // console.log(response.data[i].gamedetails[0].gameid);
          let game = {
            id: response.data[i].gamedetails[0].gameid,
            date: response.data[i].gamedetails[0].gamedate,
            hour: response.data[i].gamedetails[0].gametime.slice(11, 19),
            hostTeam: homename.data,
            guestTeam: awayname.data,
            field: response.data[i].gamedetails[0].field,
          };
          // console.log(game);
          this.games.push(game);
        }
      } catch (error) {
        console.log("There are no games in user favorites");
        this.games = [];
        return this.games;
      }
    },
  },
};
</script>

<style>
button {
  margin: 2%;
}

#favorites{
  text-align: center;
  padding: 5%;
}
</style>
