<template>
    <div>
        <v-container>
            <v-row class="justify-center">
                <v-list class="tasks-list">
                    <v-subheader class="text-center">Tasks</v-subheader>
                    <v-list-item 
                    class="justify-space-between"
                    :key="index"
                    v-for="(task, index) in tasksDeleted">
                        <div :class="task[0].stat === 'Traitment'? '':'text--disabled'"> {{ task[0].task_name }} </div>
                        <div>
                            <v-chip 
                            :color="chipColor(task[0].importance)"
                            class="mr-3"> {{ task[0].importance }} </v-chip>
                        
                            <div class="d-inline-block">
                                Created by: {{ task[0].creator }} to {{ task[0].asignTo }}
                            </div>
                            <v-btn 
                            icon 
                            @click="putBack(task[0])"
                            :disabled="task[0].creator !== userOnLine">
                                <v-icon 
                                color="green">mdi-arrow-right</v-icon>
                            </v-btn>
                            <v-btn 
                            icon 
                            @click="modale(task[0], 'deleted')"
                            :disabled="task[0].creator !== userOnLine">
                                <v-icon 
                                color="red">mdi-close</v-icon>
                            </v-btn>
                        </div>
                    </v-list-item>
                </v-list>
            </v-row>
        </v-container>
        <v-dialog
        v-model="dialog"
        max-width="290">
            <v-card>
                <v-card-title class="headline" v-text="'Remove ' + task_field.task_name"></v-card-title>
                <v-card-text v-text="'Are you sure to remove ' + task_field.task_name">
                    
                </v-card-text>
                <v-card-actions>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        No
                    </v-btn>

                    <v-btn 
                    color="red" 
                    text 
                    @click="remove(task_field)">Remove</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <notification
        :task_field='task_field'
        :snackbar="snackbar"
        notification_text="are removed definitly"
        @snackbarChnage="snackbarChnage()"/>
    </div>
</template>

<script>
import mixin from '../mixins/index'
import Notification from "../components/Notification";

export default {
    mixins: [mixin],
    components: {
        Notification
    },
    data() {
        return {
            tasksDeleted: JSON.parse(localStorage.getItem('deletedTask')) || [],
        }
    },
    created () {
        document.title = "Deleted Tasks";
    },
    methods:  {
        remove(task) {
            
            // this.tasksDeleted.forEach((t, index) => {
            //     if (t.task_id === task.task_id) {
            //         this.tasksDeleted.splice(index, 1)
            //     }
            // });
            this.tasksDeleted.filter((t, i) => {
                this.tasksDeleted.splice(i, 1)
                t.task_id === task.task_id
            })
            localStorage.setItem('deletedTask', JSON.stringify(this.tasksDeleted))
            this.dialog = false
            this.snackbar = true
        },
        putBack(task) {
            
                this.tasks.unshift({
                task_id: this.lastId(),
                task_name: task.task_name,
                stat: "Traitment",
                creator: task.creator,
                asignTo: task.asignTo,
                importance: task.importance
            });
            localStorage.setItem('tasks', JSON.stringify(this.tasks))

            // this.tasksDeleted.forEach((t, index) => {
            //     if (t.task_id === task.task_id) {
            //         this.tasksDeleted.splice(index, 1)
            //     }
            // });
            this.tasksDeleted.filter((t, i) => {
                this.tasksDeleted.splice(i, 1)
                t.task_id === task.task_id
            })
            localStorage.setItem('deletedTask', JSON.stringify(this.tasksDeleted))
        },
    },
    mounted() {
        console.log(this.tasksDeleted)
    }
}
</script>

<style scoped>
.v-list-item:after {
    content: none;
}
.tasks-list {
    width: 70%;
}

</style>