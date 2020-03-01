<template>
<div>
  <b-row v-if="this.user.data.displayName == 'taylor'" align-h="center">
    <youtube v-if="currSong.link"
              :video-id="currSong.link" 
              ref="youtube" 
              @ended="getSong"></youtube>
    <!-- <button @click="playVideo">play</button> -->
  </b-row>
  <b-row v-if="1 > 0" align-h="center">
    <b-col>
    <h1>🎙️ {{ currSong.singer }} 🎙️ is singing  🎵🎶🎶</h1>
    <h2>{{ currSong.title }}</h2>
    </b-col>
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
      <b-col>
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
          <td><a>{{video.singer}}</a></td>
          <td>{{video.title}}</td>
        </tr>
      </tbody>
    </table>
      </b-col>
  </b-row>
</div>
</template>

<script>
import { db } from "../firebase/db";
import axios from 'axios';
import { mapGetters } from "vuex";

export default {
  firebase: {
    videoQueue: db.ref(`videoQueue`)
  },
  data() {
    return {
      currSong: {
        link: 'QAsZMcX5Zoc',
        singer: 'Taylor',
        title: 'mozart',
      },
      videoQueue: [],
      newSong: {
        singer: '',
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
        this.currSong.link = nextSong.link
        this.currSong.singer = nextSong.singer
        this.currSong.title = nextSong.title
        db.ref(`videoQueue`).child(key).remove()
      })
      this.playVideo()
    },
    getId (url) {
      return this.$youtube.getIdFromUrl(url)
    },
    addSong() {
      var songId = this.getId(this.newSong.link)
      if (songId) {
        var ytApi = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + 
                    songId + "&key=" + process.env.VUE_APP_YOUTUBE_APIKEY
        axios.get(ytApi).then((data) => {
                        this.newSong.singer = this.user.data.displayName
                        this.newSong.title = data.data.items[0].snippet.title;
                        this.newSong.link = songId
                        db.ref(`videoQueue`).push(this.newSong);
                        this.newSong.link = '';
                        this.newSong.title = '';
                        this.newSong.singer = '';
                        })
      }
      else
        alert('Your link does not exist.')

    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
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