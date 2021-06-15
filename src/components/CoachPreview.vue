<template>
  <div class="coach-preview">
    <div :title="id" class="coach-title">
      <b>coach Id:</b> {{ coachId }}
    </div>
    <ul class="coach-content">
      <li> Fullname: {{ fullname }}</li>
      <li> Team Name: {{ teamName }}</li>
      <img :src="image" width="40%" alt="">
    </ul>
  </div>
</template>

<script>
export default {
  name: "CoachPreview",
  props: {
      coachId: {
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
      teamName: {
        type: String,
        required: true
      },
  }, 
  mounted(){
    console.log("coach preview mounted")
  } 
};
</script>

<style>
.coach-preview {
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

.coach-preview .coach-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.coach-preview .coach-content {
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
