<template>
  <v-container>
    <v-row class="d-flex align-center flex-column">
      <v-col lg="3" class="mt-5">
        <h1 class="font-weight-black text-center">Login/Register</h1>
        <v-card>
          <v-tabs grow="grow" class="tabs mt-10">
            <v-tab>Login</v-tab>
            <v-tab>Register</v-tab>
            <v-tab-item class="px-5 pb-5">
              <v-form ref="loginForm">
                <v-text-field
                  v-model="username"
                  label="Username"
                  :rules="usernameRules"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  counter
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn
                  color="primary"
                  outlined
                  small
                  :disabled="checkValues('login')"
                  @click="validate('login')"
                  >Login</v-btn
                >
              </v-form>
            </v-tab-item>
            <v-tab-item class="px-5 pb-5">
              <v-form ref="registerForm">
                <v-text-field
                  v-model="email"
                  label="Email"
                  :rules="emailRules"
                ></v-text-field>
                <v-text-field
                  v-model="username"
                  label="Username"
                  :rules="usernameRules"
                  :counter="10"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  :rules="passwordRules"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  counter
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn
                  color="primary"
                  outlined
                  small
                  :disabled="checkValues('register')"
                  @click="validate('register')"
                  >Register</v-btn
                >
              </v-form>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" color="error" :right="true">
      Incorrect username or password
      <v-btn @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      showPassword: false,
      email: "",
      username: "",
      password: "",
      emailRules: [
        value => !!value || "Email is required.",
        value => /.+@.+\..+/.test(value) || "E-mail must be valid"
      ],
      usernameRules: [
        value => !!value || "Username is required.",
        value =>
          (value && value.length <= 10) || "Username must be less than 10",
        value => /^\S+$/.test(value) || "Spaces are not allowed on Username",
        value =>
          !/[^a-zA-Z0-9]/.test(value) ||
          "Characters are not allowed on Username"
      ],
      passwordRules: [
        value => !!value || "Password is required.",
        value => (value && value.length > 3) || "Password must be more than 3",
        value => /^\S+$/.test(value) || "Spaces are not allowed on Password",
        value => /[^\w-]/.test(value) || "Password must have caracters"
        // value => /^[0-9]+$/.test(value) || "Password must have numbers",
      ],
      snackbar: false
    };
  },
  created() {
    document.title = "Login/Register";
  },
  methods: {
    checkValues(loginOrRegister) {
      if (loginOrRegister === "register")
        return !(this.email && this.username && this.password);
      return !(this.username && this.password);
    },
    validate(loginOrRegister) {
      if (loginOrRegister === "register") {
        this.$refs.registerForm.validate();
        this.checkInfo(this.$refs.registerForm.validate(), loginOrRegister);
        return;
      }
      this.$refs.loginForm.validate();
      this.checkInfo(this.$refs.loginForm.validate(), loginOrRegister);
    },
    checkInfo(value, loginOrRegister) {
      if (value) {
        if (loginOrRegister === "login")
          return (
            (this.username === "User" &&
              this.password === "123" &&
              !localStorage.setItem("username", this.username) &&
              this.$router.push({ name: "Dashboard" })) ||
            (this.snackbar = true)
          );
        return (
          !localStorage.setItem("username", this.username) &&
          this.$router.push({ name: "Dashboard" })
        );
      }
    }
  },
  mounted() {
    // console.log(localStorage.setItem('username', this.username));
    // localStorage.clear()
    // console.log(localStorage);
  }
};
</script>
