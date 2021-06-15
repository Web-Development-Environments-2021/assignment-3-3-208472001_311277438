<template>
  <div>
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
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    // this.updateGames();
    return {
      games: [
        {
          id: 123,
          date: "27/5/21",
          hour: "20:00",
          hostTeam: "Maccabi Tel-Aviv",
          guestTeam: "Hapoel Beer-Sheva",
          field: "Bloomfield"
        },
        {
          id: 124,
          date: "27/5/21",
          hour: "20:00",
          hostTeam: "Maccabi Tel-Aviv",
          guestTeam: "Hapoel Beer-Sheva",
          field: "Bloomfield"
        },
        {
          id: 125,
          date: "27/5/21",
          hour: "20:00",
          hostTeam: "Maccabi Tel-Aviv",
          guestTeam: "Hapoel Beer-Sheva",
          field: "Bloomfield"
        }
      ]
    };
  },
  methods: {
    async updateGames(){
      try {
        const response = await this.axios.get(
          "http://localhost:3000/users/favoriteGames",
        );
        const games = response.data.games;
        this.games = [];
        this.games.push(...games);
        console.log(response);
      } catch (error) {
        console.log("There are no games in user favorites")
        // console.log(error);
         this.games =  []
        return this.games
      }
    }
  },
};
</script>

<style></style>
