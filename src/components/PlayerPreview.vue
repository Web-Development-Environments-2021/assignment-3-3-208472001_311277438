<template>
  <div class="player-preview">
    <div :title="id" class="player-title">
      <b>Player Id:</b> {{ playerId }}
    </div>
    <ul class="player-content">
      <li> Fullname: {{ fullname }}</li>
      <li> Position: {{ position }}</li>
      <li> Team Name: {{ teamName }}</li>
      <!-- <li> Common Name: {{ commonName }}</li> -->
      <!-- <li> Nationality: {{ nationality }}</li>
      <li> birthdate: {{ birthdate }}</li>
      <li> birthcountry: {{ birthcountry }}</li>
      <li> height: {{ height }}</li>
      <li> weight: {{ weight }}</li> -->
       <!-- <router-link to="/"> -->
       <div @click="redirect">
      <img :src="image" width="40%">
      </div>
    </ul>

  </div>
</template>

<script>
export default {
  name: "PlayerPreview",
  data() {
      return {

      };
  },
  props: {
      playerId: {
        type: Number,
        required: true
      },
      fullname: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        required: true
      },
      teamName: {
        type: String,
        required: true
      },
    //   commonName:
    //   {
    //     type: String,
    //   },
    //   nationality:
    //   {
    //     type: String,
    //   },
    //   birthdate:
    //   {
    //     type: String,
    //   },
    //   birthcountry:
    //   {
    //     type: String,
    //   },
    //   height:
    //   {
    //     type: String,
    //   },
    //   weight:
    //   {
    //     type: String,
    //   },
  }, 
  mounted(){
    console.log("player preview mounted")
  },
  methods: {
      redirect() {
        //   alert("fvsvd");
        this.$router.push({ name: 'PlayerPage' })
      }
  } 
};
</script>

<style>
.player-preview {
  display: inline-block;
  width: 500;
  height: auto;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}

/* .player-preview .img{
    max-width: 100%;
    max-height: 100%;
    display: block; 
    position: relative;
} */

</style>
