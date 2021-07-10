<template>
  <div id="favorites">
    <h3>Your Favorite Teams</h3>
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
      <!-- scoped slot for select -->
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

      <template v-slot:cell(name)="data">
        <a @click="redirect(data.value)" variant="primary">{{data.value}}</a>
      </template>

      <template v-slot:cell(logo)="{ item }">
        <img :src="item.logo" fluid>
      </template>

      <!-- <template slot="logo">
      <img src="https://cdn.auth0.com/blog/vuejs/vue-logo.png" alt="" width="50" height="50">
    </template> -->
    </b-table>
    <p>
      <b-button size="sm" @click="removefromfavorites"
        >Delete Team From Favorites</b-button
      >
    </p>
  </div>
</template>

<script>
export default {
  data() {
    this.loadFavoriteTeams();
    return {
      fields: [
        { key: "selected", label: "Selected" },
        { key: "name", label: "Name" },
        { key: "logo", label: "Logo", image: true },
      ],
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
    async redirect(data){
      let teamId = "";
      for (let i=0; i < this.teams.length; i++) {
        if (this.teams[i].name == data) {
          teamId = this.teams[i].id;
            break;
        }
      }
      this.$router.push({name: 'TeamHomePage', params: {teamId: teamId} });
    },
    async removefromfavorites() {
      // Rows are indexed from 0, so the third row is index 2
      try {
        let response = await this.axios.delete(
          `http://localhost:3000/users/favorites/Team/${this.selected[0].id}`
        );

        if (response.data == "Succeeded") {
          alert("That game was successfully removed from favorites");
          this.loadFavoriteTeams();
        } else {
          alert(
            "There was a problem with removing this team from favorites, please try again"
          );
        }
      } catch (error) {
        console.log(
          "There was a problem with deleting the team from favorites"
        );
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
            name: response.data[i].team_name,
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
#favorites {
  text-align: center;
  padding: 5%;
}
</style>
