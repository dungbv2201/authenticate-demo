<template>
    <v-container class="height-100">
        <v-row no-gutters justify="center" align="center" class="height-100">
            <v-col cols="4" sm="4">
                <v-card min-height="500" mx-auto>
                    <v-card-title class="d-flex text-center d-flex justify-center">
                        <h3 class="text--darken-1 my-10 text-center">Login</h3>
                    </v-card-title>
                    <span v-if="messageError" class="text--primary d-block text-center">{{  messageError }}</span>
                    <v-row justify="center">
                        <v-col cols="10">
                            <v-text-field
                                    label="Email"
                                    placeholder="Email"
                                    v-model="email"
                                    outlined
                                    :error-messages="validateError.email"
                            />
                            <v-text-field
                                    label="Pass word"
                                    placeholder="Password"
                                    v-model="password"
                                    type="password"
                                    outlined
                                    :error-messages="validateError.password"
                            />
                            <div class="d-flex justify-end" style="margin-top: -20px">
                                <v-checkbox v-model="remember" label="Remember me"/>
                            </div>
                            <div class="d-flex justify-end">
                                <v-btn color="success" @click="authenticate()">
                                    Submit
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    name: "Login",
    data() {
      return {
        email: '',
        password: '',
        validateError: {},
        messageError: '',
        remember: false
      };
    },
    methods: {
      ...mapActions(['loginByEmail']),
      authenticate() {
        const credentials = {
          email: this.email,
          password: this.password
        };
        this.loginByEmail({credential:credentials,remember:this.remember})
          .then(response => {
            this.$router.push('/')
          })
          .catch(err => {
            if (err.errors) {
              this.messageError =''
              this.validateError = err.errors
            }else if(err.message){
              this. validateError ={}
              this.messageError = err.message
            }
          })
      }
    }
  };
</script>
<style>
    .height-100 {
        height: 100%;
    }
</style>
