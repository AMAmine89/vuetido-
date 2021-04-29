<template>
  <div>
    <v-snackbar v-model="snackbar" color="error" :right="true">
      {{ task_field.task_name + " " + notification_text }}
      <v-btn @click="snackbarChnage()">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    notification_text: String,
    snackbar: Boolean,
    task_field: Object
  },
  methods: {
    snackbarChnage() {
      this.$emit("snackbarChnage");
    }
  }
};
</script>
