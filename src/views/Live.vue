<template>
<div>
  <youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
  <!-- <button @click="playVideo">play</button> -->
</div>
</template>

<script>
import { db } from "../firebase/db";
export default {
  data() {
    return {
      videoId: 'qQzdAsjWGPg'
    }
  },
  firebase: {
    videoQueue: db.ref('videoQueue')
  },
  methods: {
    playVideo() {
      this.player.playVideo()
    },
    playing() {
      console.log('we are watching!!!')
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  }
}
</script>

<style scoped>
</style>