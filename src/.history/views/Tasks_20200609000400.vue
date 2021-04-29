<template>
    <div>
        <v-container>
            <btn-add @click="modale()"></btn-add>
            <core 
            :tasks="tasks"
            :userOnLine="userOnLine"
            @checkTask="checkTask"
            @modale="modale"
            @deleteTask="deleteTask"/>
        </v-container>
        <modale 
        :dialog="dialog"
        :addOrEdit="addOrEdit"
        :task_field='task_field'
        :users="users"
        :userRules="userRules"
        :importances="importances"
        :importanceRules="importanceRules"
        :taskRules='taskRules'
        @addEdit="addEditTask(addOrEdit, task_field)" 
        @cancelEdit="cancelEdit()"/>
        
        <notification
        :task_field='task_field'
        :snackbar="snackbar"
        notification_text="moved to trash"
        @snackbarChnage="snackbarChnage()"/>
    </div>
</template>

<script>

import mixin from '../mixins/index'
import BtnAdd from '../components/BtnAdd'
import Core from "../components/Core"
import Modale from '../components//Modal'
import Notification from "../components/Notification";

export default {
    mixins: [mixin],
    components: {
        BtnAdd,
        Core,
        Modale,
        Notification
    },
    data() {
        return {
            users: ['User1', 'User2', 'User3'],
            importances: ['Urgent', 'Important', 'Normale'],
            userRules: [
                value => !!value || "Task name is required.",
            ],
            taskRules: [
                value => !!value || "User is required.",
            ],
            importanceRules: [
                value => !!value || "The importance is required.",
            ],
        }
    },
    created () {
        document.title = "Dashboard";
    },
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