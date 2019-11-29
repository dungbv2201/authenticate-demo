<template>
    <v-app>
        <v-navigation-drawer app>
            <v-navigation-drawer permanent>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title">
                            {{ userName }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ email }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider/>

                <v-list dense nav>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-view-dashboard</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>user</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-navigation-drawer>

        <v-app-bar app height="74">
            <div class="d-flex justify-end" style="width: 100%">
                <v-btn color="error" @click="logOut()">logout</v-btn>
            </div>
        </v-app-bar>

        <v-content>
            <v-container fluid>
                <v-card class="app-content">
                    <router-view/>
                </v-card>
            </v-container>
        </v-content>
        <v-footer app>

        </v-footer>
    </v-app>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {

    computed: {
      ...mapGetters(['userName', 'email'])
    },
    methods: {
      ...mapActions(['signOut']),
      logOut() {
        this.signOut()
          .then(() => {
            this.$router.push('/login')
          })
      }
    }
  }
</script>

<style scoped>
    .app-content {
        height: 100%;
    }
</style>