<template>
<div>
  <b-navbar class="navbar" toggleable="lg" type="dark" variant="danger" fixed="top">
    <b-navbar-brand @click="goHome" href="#">ft_KTV BETA</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
          <b-button @click="goLive" size=lg variant='danger'>
            <b-icon-camera-video-fill></b-icon-camera-video-fill>
          </b-button>        
          <b-button size=lg variant='danger'>
            <b-icon-search></b-icon-search>
          </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { BIconSearch, BIconCameraVideoFill } from 'bootstrap-vue'
export default {
  name: 'navbar',
  props: {
    msg: String
  },
  components: { 
    BIconSearch, 
    BIconCameraVideoFill
  },
  methods: {
    goHome: function() {
      this.$router.push('/')
    },   
    goLive: function() {
      this.$router.push('/live')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>