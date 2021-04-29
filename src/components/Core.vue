<template>
  <div>
    <v-row class="justify-center">
      <v-list class="tasks-list">
        <v-subheader class="text-center">Tasks</v-subheader>
        <v-list-item
          class="justify-space-between"
          :key="index"
          v-for="(task, index) in tasksGroupe"
        >
          <div :class="task.stat === 'Traitment' ? '' : 'text--disabled'">
            {{ task.task_name }}
          </div>
          <div>
            <v-chip :color="chipColor(task.importance)" class="mr-3">
              {{ task.importance }}
            </v-chip>

            <div class="d-inline-block">
              Created by: {{ task.creator }} To: {{ task.asignTo }}
            </div>
            <v-btn
              icon
              @click="checkTask(task)"
              :disabled="task.asignTo !== userOnLine"
            >
              <v-icon
                :color="task.stat === 'Traitment' ? 'success' : 'primary'"
                v-text="task.stat === 'Traitment' ? 'mdi-check' : 'mdi-close'"
              ></v-icon>
            </v-btn>
            <v-btn
              icon
              @click="modale(task)"
              :disabled="task.creator !== userOnLine"
            >
              <v-icon color="warning">mdi-square-edit-outline</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="deleteTask(task)"
              :disabled="task.creator !== userOnLine"
            >
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-list-item>
      </v-list>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Core",
  props: {
    tasks: Array,
    userOnLine: String
  },
  methods: {
    checkTask(task) {
      this.$emit("checkTask", task);
    },
    modale(task) {
      this.$emit("modale", task);
    },
    deleteTask(task) {
      this.$emit("deleteTask", task);
    },
    // chipColor(importance) {
    //     this.$emit('chipColor', importance)
    // },
    chipColor(importance) {
      if (importance === "Urgent") return "red";
      if (importance === "Important") return "warning";
      return "primary";
    }
  },
  computed: {
    tasksGroupe() {
      if (this.$route.name === "Dashboard") return this.tasks;
      if (this.$route.name === "Tasks")
        return this.tasks.filter(task => task.asignTo === this.userOnLine);
      if (this.$route.name === "Completed")
        return this.tasks.filter(
          task => task.asignTo === this.userOnLine && task.stat !== "Traitment"
        );
      return this.tasks;
    }
  }
};
</script>

<style scoped>
.v-list-item:after {
  content: none;
}
.tasks-list {
  width: 85%;
}
</style>
