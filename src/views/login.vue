<template>
<div id="login" class="bg-light" varient='danger'> 
<b-row>
<b-jumbotron id="login_box" class="bg-light">
    <h1 align="center" class="topfont">Welcome to ft_KTV</h1>
    <h5 align="center" class="secondfont">Where you get to hear tyang sing</h5>
    <b-form @submit.prevent="login" v-if="show">
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.username" 
          required
          placeholder="Your stage name"
        >
        </b-form-input>
      </b-form-group>
            <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.password" 
          required
          placeholder="Password"
        >
        </b-form-input>
      </b-form-group>  
      <h5 class="middle">No password resets.</h5>
      <b-row class="justify-content-md-center">
        <b-col>
          <b-button block type="submit" variant="danger">Login</b-button>
        </b-col>
           <b-col>
          <b-button block @click="goSignup" variant="secondary">Sign up</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-card class="mt-3" header="Form Data Result" v-if="debug">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </b-jumbotron>
</b-row>
  </div>
</template>

<script>
  import { Auth } from '../firebase/auth'

  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        show: true,
        debug: false,
        errors: [],
      }
    },
    methods: {
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      login(event) {
        this.errors = [];
        if (!this.errors.length) {
          event.target.classList.add('was-validated');
          var fakeEmail = this.form.username + '@ktv.com'
          Auth.signInWithEmailAndPassword(fakeEmail, this.form.password)
            .then(() => this.$router.push('/live'))
            .catch(err => {
              this.errors.push(err.message)
              alert('Ooops Wrong username and password...')
              this.form.username = ''
              this.form.password = ''
            });
        }
        else
          alert('get a account')
      },
      goSignup() {
        this.$router.push('/signup')
      }
    }
  }
</script>

<style scoped>
.topfont {
  padding-top: 50px;
}
.secondfont {
  padding-bottom: 20px;
}
.middle {
  text-align: center;
}
#header {
  text-align: center;
}
#login {
  background-color: rgb(202, 34, 34);
  height: auto;
}

#login_box {
  padding-top: 20px;
  margin: auto;
  margin-top: 55px;
  width: 500px;
  text-align: left;
  height: 100vw;
}
</style>