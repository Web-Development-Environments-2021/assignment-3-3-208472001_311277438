<template>
  <div id="body">
    <br /><br /><br />
    <h3>
      ----------------------------Future games----------------------------
    </h3>
    <br /><br />

    <b-table
      :items="this.futuregames"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
      <template v-slot:cell(hostTeam)="data">
        <router-link :to="{ name: 'TeamPage' }">{{
          data.value
        }}</router-link>
      </template>
      <template v-slot:cell(guestTeam)="data">
        <router-link :to="{ name: 'TeamPage' }">{{
          data.value
        }}</router-link>
      </template>

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
      <b-button size="sm" @click="selectAllRows">Select all</b-button>
      <b-button size="sm" @click="clearSelected">Clear selected</b-button>
      <b-button size="sm" @click="addtofavorites"
        >click to add those games to your favotire games</b-button
      >
    </p>

    <br /><br /><br />
    <h3>
      ----------------------------Past games----------------------------
    </h3>
    <br /><br />

    <b-table :items="this.pastgames" :fields="pastfields" striped responsive="sm">
      <template v-slot:cell(hostTeam)="data">
        <router-link :to="{ name: 'TeamPage' }">{{data.value}}</router-link>
      </template>
      <template v-slot:cell(guestTeam)="data">
        <router-link :to="{ name: 'TeamPage' }">{{data.value}}</router-link>
      </template>

      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Age 1:</b></b-col>
            <b-col>{{ row.item.age }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
    <br /><br />
  </div>
</template>

<script>
export default {
  data() {
    this.getfutureGames();
    this.getpastGames();
    return {
      fields: [
        "selected",
        "date",
        "hour",
        "hostTeam",
        "guestTeam",
        "homeGoal",
        "awayGoal",
        "field",
        "stage",
      ],
      pastfields: [
        "date",
        "hour",
        "hostTeam",
        "guestTeam",
        "homeGoal",
        "awayGoal",
        "field",
        "stage",
        "show_details"
      ],
      futuregames: this.futuregames,
      pastgames: this.pastgames,
      selected: [],
      selectMode: "multi",
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
    async addtofavorites() {
      try {
        // console.log(this.selected);
        let answer = "";
        for(let i=0; i < this.selected.length; i ++){
          const response = await this.axios.post(
            "http://localhost:3000/users/favoriteGames",
            {
              gameId: this.selected[i].id
            }
          );

        answer += i.toString() + ". " + response.data + '\n';
        }
        alert(answer);
      } catch (error) {
        console.log("There was a problem with the games to add to favorites");
      }
    },
    async getfutureGames() {
      try {
        let response = await this.axios.get(
          "http://localhost:3000/league/futuregames"
        );
        this.futuregames = [];
        for (let i = 0; i < response.data.length; i++) {
          let homename = await this.axios.get(
            `http://localhost:3000/teams/teamName/${response.data[i].hometeamID}`
          );

          let awayname = await this.axios.get(
            `http://localhost:3000/teams/teamName/${response.data[i].awayteamID}`
          );

          let game = {
            id: response.data[i].gameID,
            date: response.data[i].gamedate,
            hour: response.data[i].gametime.slice(11, 19),
            hostTeam: homename.data,
            guestTeam: awayname.data,
            homeGoal: "Not played",
            awayGoal: "Not played",
            field: response.data[i].field,
            stage: response.data[i].stage,
          };
          // console.log(game);
          this.futuregames.push(game);
        }
      } catch (error) {
        console.log("There are no games in the future");
        this.games = [];
        return this.games;
      }
    },
    async getpastGames() {
      try {
        let response = await this.axios.get(
          "http://localhost:3000/league/pastgames"
        );
        this.pastgames = [];
        for (let i = 0; i < response.data.past_games.length; i++) {
          let homename = await this.axios.get(
            `http://localhost:3000/teams/teamName/${response.data.past_games[i].hometeamID}`
          );
          let awayname = await this.axios.get(
            `http://localhost:3000/teams/teamName/${response.data.past_games[i].awayteamID}`
          );
          console.log("11111111111111111111");
           let gameevents = await this.axios.get(
            `http://localhost:3000/league/getEvents/${response.data[i].gameID}`
          );
          console.log(gameevents.data);

          if (gameevents == []){
            alert("there is a problem with the events");
          }

          let game = {
            id: response.data.past_games[i].gameID,
            date: response.data.past_games[i].gamedate,
            hour: response.data.past_games[i].gametime.slice(11, 19),
            hostTeam: homename.data,
            guestTeam: awayname.data,
            homeGoal: response.data.past_games[i].homeGoal,
            awayGoal: response.data.past_games[i].awayGoal,
            field: response.data.past_games[i].field,
            stage: response.data.past_games[i].stage,
            _showDetails: true,
            age: 20
          };
          this.pastgames.push(game);
        }
      } catch (error) {
        console.log("There are no games in the past");
        this.pastgames = [];
        return this.pastgames;
      }
    },
  },
};
</script>

<style>
button {
  margin: 2%;
  text-align: center;
}
p {
  text-align: center;
}
template {
  margin: 4%;
}
h3 {
  text-align: center;
}
#body{
  padding: 5%;
}
</style>
