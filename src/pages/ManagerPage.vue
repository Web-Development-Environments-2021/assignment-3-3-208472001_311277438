<template>
  <div id="manager">
    <div>
      <br /><br />
      <h3>Welcome to Manager page</h3>
      <br /><br />
      <b-container class="bv-example-row">
        <b-row>
          <b-col>Add game to the league</b-col>
          <b-col>Update score to a previous game</b-col>
          <b-col>Add event to a game</b-col>
        </b-row>
      </b-container>
      <br /><br />
      <h5>
        Here you can choose some options to update the games in the league
      </h5>
      <br /><br />
      <b-button v-b-toggle.collapse-1 variant="primary"
        >Click here if you want to add game to the league</b-button
      >
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <p class="card-text">
            <br />
            Fill the following parameters to add a game to the league
            <br /><br />
          </p>
        </b-card>
      </b-collapse>
      <br /><br />
      <b-button v-b-toggle.collapse-1 variant="primary"
        >Click here if you want to update score to previous game</b-button
      >
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <p class="card-text">
            <br />
            Fill the following parameters to add update score to a game
            <br /><br />
          </p>
        </b-card>
      </b-collapse>
      <br /><br />
      <b-button v-b-toggle.collapse-1 variant="primary"
        >Click here if you want to add event to a game</b-button
      >
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <div class="card-text">
            <br />
            <h6>Fill the following parameters to add event to a game</h6>
            <br /><br />
            Choose game from the list above:
            <!-- fill -->
            <br /><br />
            Choose minute of the event
            <select v-model="minute">
              <option disabled value="">Please select minute</option>
              <option>1</option
              ><option>2</option>
              <option>3</option
              ><option>4</option>
              <option>5</option
              ><option>6</option>
            </select>
            <!-- <span>minute: {{ minute }}</span> -->
            <br /><br />
            Choose the event
            <select v-model="event">
              <option disabled value="">Please select event</option>
              <option>Goal</option
              ><option>Offside</option>
              <option>Foul</option
              ><option>Yello-card</option>
              <option>Red-card</option
              ><option>Injury</option
              ><option>Subtitution</option>
            </select>
            <!-- <span>event: {{ event }}</span> -->
            <br /><br />
            Choose the Player
            <select v-model="player">
              <option disabled value="">Please select Player</option>
              <option>1</option
              ><option>2</option>
              <option>3</option
              ><option>4</option>
              <option>5</option
              ><option>6</option>
            </select>
            <!-- <span>event: {{ event }}</span> -->
            <br />
            <button v-on:click="submit_event">submit</button>
          </div>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minute: 2,
      event: "Goal",
      player: 0,
    };
  },
  methods: {
    async submit_event() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/manager/addEvent",
          {
            gameID: 14006,
            eventminute: this.minute,
            dataevent: this.event,
            playerID: this.player,
          }
        );
        alert()
        console.log("event was added successfully");
      } catch (error) {
        console.log("There problem with adding event to game");
      }
    },
  },
};
</script>

<style>
#manager {
  text-align: center;
}
</style>
