<template>
  <div id="favorites">
    <br /><br /><br />
    <h3>Your favorite teams are:</h3>
    <br /><br />
    <b-table
      :items="this.teams"
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
      <template slot="[logo]" slot-scope="data">
        <img :src="data.value" />
      </template>
    </b-table>
    <p>
      <b-button size="sm" @click="removefromfavorites"
        >click to delete this team from your favotire teams</b-button
      >
    </p>
  </div>
</template>

<script>
export default {
  data() {
    this.loadFavoriteTeams();
    return {
      fields: ["selected", "Name", "logo"],
      teams: this.teams,
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
    async loadFavoriteTeams() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteTeams"
        );
        this.teams = [];
        for (let i = 0; i < response.data.length; i++) {
          let team = {
            id: response.data[i].team_id,
            Name: response.data[i].team_name,
            logo: response.data[i].team_logo,
          };
          this.teams.push(team);
        }
      } catch (error) {
        console.log("There are no teams in user favorites");
        this.teams = [];
        return this.teams;
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
