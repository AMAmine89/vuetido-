<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      color="blue"
      absolute
      dark
      temporary
      bottom
    >
      <v-list class="p-10 mt-10">
        <v-list-item link>
          <v-list-item-avatar class="d-inline-block">
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="d-inline-block">
            <v-list-item-title class="title">{{
              userOnLine
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          link
          :to="link.route"
          :class="index === 0 ? 'mt-10' : ''"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="px-10">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>VuitiDo</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout()">Logout</v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",
  data() {
    return {
      links: [
        {
          text: "All Tasks",
          icon: "mdi-account-multiple",
          route: "/dashboard"
        },
        {
          text: "My Tasks",
          icon: "mdi-account",
          route: "/tasks"
        },
        {
          text: "Completed",
          icon: "mdi-check",
          route: "/completed"
        },
        {
          text: "Deleted",
          icon: "mdi-delete",
          route: "/deleted"
        }
      ],
      drawer: false,
      userOnLine: localStorage.getItem("username")
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("username");
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
