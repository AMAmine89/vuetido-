<template>
  <div>
    <v-btn class="float-right" @click="modale()" color="success">
      Add task
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "BtnAdd",
  methods: {
    modale() {
      this.$emit("click");
    }
  }
};
</script>
