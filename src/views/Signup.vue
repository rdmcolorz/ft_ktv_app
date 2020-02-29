<template>
<div id="signup" class="bg-light"> 
<b-jumbotron id="signup_box" class="bg-light">
    <h1 class="topfont">Create New Account</h1>
    <b-form @submit.prevent="onSignUp" v-if="show">

      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          required
          placeholder="Stage name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input
          id="input-2"
          :type="passwordShow"
          v-model="form.password"
          required
          placeholder="New password"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-checkbox
          id="checkbox-1"
          v-model="passwordShow"
          name="checkbox-1"
          value="text"
          unchecked-value="password"> Show Password
          </b-form-checkbox>
        </b-form-group>

      <b-row class="justify-content-md-center">
        <b-col>
          <b-button block cols="3" type="submit" variant="primary">Sign Up</b-button>
        </b-col>
        <b-col align-self="end" style="font-size: 18px; text-align: right; padding: 0px" cols="6">Already have a account?</b-col>
        <b-col cols="3">
          <b-button block @click="goLogin" variant="outline-secondary">Log In</b-button>
        </b-col>
      </b-row>
      
    </b-form>
    <b-card class="mt-3" header="Form Data Result" v-if="debug">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </b-jumbotron>
  </div>
</template>

<script>
import { Auth } from '../firebase/auth'
// import { db } from '../firebase/db'

  export default {
    // components: {
    //   ValidationProvider
    // },
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        passwordShow: 'password',
        show: true,
        debug: false,
        errors: [],
      }
    },
    // firebase: {
    //   users: db.ref('deviceMeta')
    // },
    methods: {
      onSignUp(event) {
        this.errors = [];
        if (this.form.username.length < 5) {
          this.errors.push('Your password is not strong enough!')
        }
        if (!this.errors.length) {
          console.log('creat user')
          event.target.classList.add('was-validated');
          var fakeEmail = this.form.username + '@ktv.com'
          Auth.createUserWithEmailAndPassword(fakeEmail, this.form.password)
            .then(() => {
              console.log('Created user')
              this.$router.push('/')
            }).catch((error) => {
              this.errors.push(error.message);
              alert(this.errors)
            });
            alert('Created Account!')
        }
      },
      goLogin() {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
.topfont {
  padding-top: 50px;
  padding-bottom: 20px;
}

#signup {
  height: 100vw;
  background-color: rgb(37, 37, 37),
}

#signup_box {
  padding-top: 20px;
  margin: auto;
  margin-top: 55px;
  width: 500px;
  text-align: left;
}
</style>