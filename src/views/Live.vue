<template>
<div>
  <b-row align-h="center">
    <youtube v-if="currSongLink"
              :video-id="currSongLink" 
              ref="youtube" 
              @ended="getSong"></youtube>
    <!-- <button @click="playVideo">play</button> -->
  </b-row>
  <b-row>
      <b-col>
      <b-form @submit.prevent="addSong">
        <!-- <b-form-group label-cols-sm="5"> -->
        <b-col>
        <b-form-input
          id="input-1"
          v-model="newSong.link"
          required
          placeholder="Song Youtube URL"
        >
        </b-form-input>
        </b-col>
        <b-col>
          <b-button block type="submit" variant="danger">Submit</b-button>
        </b-col>
        <!-- </b-form-group> -->
      </b-form> 
      </b-col>
  </b-row>
    <b-row>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Singer</th>
          <th>Song</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(video, index) in videoQueue"
            :key="index">
          <td><a>{{video.id}}</a></td>
          <td>{{video.title}}</td>
        </tr>
      </tbody>
    </table>
  </b-row>
</div>
</template>

<script>
import { db } from "../firebase/db";
import axios from 'axios'

export default {
  firebase: {
    videoQueue: db.ref(`videoQueue`)
  },
  data() {
    return {
      currSongLink: 'QAsZMcX5Zoc',
      videoQueue: [],
      newSong: {
        id: 'test',
        title: '',
        link: '',
      },
      songQueue: [],
    }
  },
  methods: {
    playVideo() {
      this.player.playVideo()
    },
    getSong() {
      console.log("Song ended!")
      db.ref(`videoQueue`).limitToFirst(1).once('child_added').then((snapshot) => {
        var key = snapshot.key
        var nextSong = snapshot.val()
        this.currSongLink = nextSong.link
        db.ref(`videoQueue`).child(key).remove()
      })
      this.playVideo()
    },
    getId (url) {
      return this.$youtube.getIdFromUrl(url)
    },
    addSong() {
      var id = this.getId(this.newSong.link)
      if (id) {
        this.newSong.link = id
        axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + 
                    id + "&key=" + process.env.VUE_APP_YOUTUBE_APIKEY).then((data) => {
                                    this.newSong.title = data.data.items[0].snippet.title;
                                    db.ref(`videoQueue`).push(this.newSong);
                                    })
      }
      else
        alert('Your link does not exist.')
      this.newSong.link = '';
    },
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    },
    playerState() {
      return this.$refs.youtube.playerState
    },
  },
}
</script>

<style scoped>
</style>