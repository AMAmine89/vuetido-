<template>
    <div>
        <v-dialog
        v-model="dialog"
        max-width="290">
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