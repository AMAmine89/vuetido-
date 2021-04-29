<template>
    <div>
        <v-dialog
        v-model="dialog">
            <v-card>
                <v-card-title class="headline" v-text="addOrEdit === 'add'? 'Add Task' : 'Edit ' + task_field.task_name"></v-card-title>

                <v-card-text>
                    <v-text-field v-model="task_field.task_name" label="Task Name" :rules="taskRules"></v-text-field>
                    <v-select
                    v-model="task_field.asignTo"
                    :items="users"
                    :rules="userRules"
                    label="Assign To">
                    </v-select>
                    <v-select
                    v-model="task_field.importance"
                    :items="importances"
                    :rules="importanceRules"
                    label="Importance">
                    </v-select>
                    <!-- <v-time-picker
                    format="24h"></v-time-picker> -->
                    <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="task_field.time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            label="Time"
                            prepend-icon="access_time"
                            readonly
                            v-bind="attrs"
                            v-on="on"></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="menu"
                        v-model="task_field.time"
                        full-width
                        @click:minute="$refs.menu.save(task_field.time)"
                        ></v-time-picker>
                    </v-menu>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="cancelEdit()">
                        No
                    </v-btn>

                    <v-btn 
                    color="green darken-1" 
                    text 
                    @click="addEditTask()"
                    :disabled="checkValues()"
                    v-text="addOrEdit === 'add'? 'Add': 'Edit'"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'Modale',
    props: {
        dialog: Boolean,
        addOrEdit: String,
        task_field: Object,
        users: Array,
        userRules: Array,
        importances: Array,
        importanceRules: Array,
        taskRules: Array
    },
    methods: {
        cancelEdit() {
            this.$emit('cancelEdit')
        },
        addEditTask() {
            this.$emit('addEdit')
        },
        checkValues() {
            // console.log('Yes');
            // console.log(Boolean(this.task_field.task_name));
            return !(this.task_field.task_name && this.task_field.asignTo && this.task_field.importance)
        },
    }
}
</script>