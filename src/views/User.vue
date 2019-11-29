<template>
    <v-card>
        <v-row justify="center">
            <v-col cols="10">
                <v-dialog
                        v-model="dialog"
                        width="500"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn
                                color="success"
                                dark
                                v-on="on"
                        >
                            Add user
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title
                                class="headline grey lighten-2"
                                primary-title
                        >
                            User
                        </v-card-title>

                        <v-card-text class="mt-10">
                            <v-text-field
                                    label="Name"
                                    placeholder="Password"
                                    type="text"
                                    outlined
                                    v-model="postData.name"
                                    :error-messages="errorMessages.name || ''"
                            />
                            <v-text-field
                                    label="Email"
                                    placeholder="Password"
                                    type="text"
                                    outlined
                                    v-model="postData.email"
                                    :error-messages="errorMessages.email || ''"
                            />
                            <v-text-field
                                    label="Password"
                                    placeholder="Password"
                                    type="password"
                                    outlined
                                    v-model="postData.password"
                                    :error-messages="errorMessages.password || ''"
                            />

                        </v-card-text>

                        <v-divider/>

                        <v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                        class="my-5"
                                        color="primary"
                                        @click="createUser()"
                                >
                                    Create
                                </v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-dialog>

                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">Name</th>
                            <th class="text-left">Email</th>
                            <th class="text-left">Created at</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.created_at }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
  import {getUser, addUser} from "../api/user.api";

  export default {
    name: "Demo",
    data() {
      return {
        getUser,
        addUser,
        users: [],
        dialog: false,
        postData: {
          email: '',
          name: '',
          password: ''
        },
        errorMessages: []
      }
    },
    created() {
      this.fetchUser()
    },
    watch: {
      dialog() {
        if (!this.dialog) {
          this.errorMessages = []
        }
      }
    },
    methods: {
      fetchUser() {
        this.getUser()
          .then(response => {
            this.users = response
          })
          .catch(err => {

          })
      },
      createUser() {
        this.addUser(this.postData)
          .then(response => {
            this.dialog = false
            this.fetchUser()
            this.postData.email ='';
            this.postData.name ='';
            this.postData.password ='';
            this.$toastr.s(response.message, "Success!");
          })
          .catch(err => {
            this.errorMessages = err.response.data.errors
          })
      }
    }
  }
</script>

<style scoped>

</style>