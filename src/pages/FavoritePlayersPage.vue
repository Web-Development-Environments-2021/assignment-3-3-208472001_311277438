<template>
  <div id="favorites">
    <h3>Your Favorite Players</h3>
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
      <template v-slot:cell(image)="{ item }">
        <img :src="item.image" fluid>
      </template>

      <template v-slot:cell(full_name)="data">
        <a @click="redirectplayer(data.value)" variant="primary">{{data.value}}</a>
      </template>

      <template v-slot:cell(team_name)="data">
        <a @click="redirectteam(data.value)" variant="primary">{{data.value}}</a>
      </template>

    </b-table>
    <p>
      <b-button size="sm" @click="removefromfavorites"
        >Delete Player From Favorites</b-button
      >
    </p>
  </div>
</template>

<script>
export default {
  data() {
    this.loadFavoritePlayers();
    return {
      fields: [
      { key: "selected", label: "Selected", image: false },
        { key: "full_name", label: "full_name", image: false },
        { key: "team_name", label: "team_name", image: false },
        { key: "image", label: "image", image: true },
        { key: "position", label: "position", image: false },
        ],
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
    async redirectteam(data){
      let teamId = "";
      for (let i=0; i < this.players.length; i++) {
        if (this.players[i].team_name == data) {
          teamId = this.players[i].id;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {team_id: teamId} });
    },
    async redirectplayer(data){
      let playerId = "";
      for (let i=0; i < this.players.length; i++) {
        if (this.players[i].full_name == data) {
          playerId = this.players[i].id;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {team_id: playerId} });
    },
    async removefromfavorites() {
      // Rows are indexed from 0, so the third row is index 2
      try {

          let response = await this.axios.delete(
            `http://localhost:3000/users/favorites/player/${this.selected[0].id}`
          );
          if(response.data == "Succeeded"){
            alert("That game was successfully removed from favorites");
            this.loadFavoritePlayers();
          }else{
            alert("There was a problem with removing this game from favorites, please try again");
          }

      } catch (error) {
        console.log("There was a problem with deleting the player from favorites");
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
