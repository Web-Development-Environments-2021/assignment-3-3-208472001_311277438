<template>
  <div id="favorites">
    <br /><br /><br />
    <h3>Your favorite player are:</h3>
    <br /><br />
    <b-table
      :items="this.players"
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
        >click to delete this player from your favotire players</b-button
      >
    </p>
  </div>
</template>

<script>
export default {
  data() {
    this.loadFavoritePlayers();
    return {
      fields: ["selected", "full_name", "team_name", "image", "position"],
      players: this.players,
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
            `http://localhost:3000/users//favorites/player/${this.selected[i].id}`
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
    async loadFavoritePlayers() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoritePlayers"
        );
        this.players = [];
        for (let i = 0; i < response.data.length; i++) {
          let player = {
            id: response.data[i].player_id,
            team_name: response.data[i].team_name,
            full_name: response.data[i].full_name,
            image: response.data[i].image,
            position: response.data[i].position
          };
          this.players.push(player);
        }
      } catch (error) {
        console.log("There are no players in user favorites");
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
