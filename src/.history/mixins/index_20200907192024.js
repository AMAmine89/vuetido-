export default {
    data() {
        return {
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            userOnLine: localStorage.getItem('username'),
            snackbar: false,
            addOrEdit :'add',
            taskToEdit: '',
            task_field : {
               task_id: '',
               task_name: '',
               stat: '',
               creator: '',
               asignTo: '',
               importance: '',
            },
            dialog : false,
        }
    },
    created() {
        this.data = {
            chipColor: this.chipColor()
        }
    },
    // computed: {
    //     chipColor() {
    //         return (importance) => {
    //             if(importance === 'Urgent') return 'red'
    //             if(importance === 'Important') return 'warning'
    //             return 'primary'
    //         }
    //     }
    // },
    methods: {
        modale(task, deleted) {
            this.dialog = true
            this.snackbar = false
            
            if (task) {
                if (!deleted) this.addOrEdit = 'edit'
                this.taskToEdit = Object.assign({}, task)
                this.task_field = task
                return
            }
            this.task_field = {
                task_id: '',
                task_name: '',
                stat: '',
                creator:'',
                asignTo: '',
                importance: '',
            }
            this.addOrEdit = 'add'
        },        
        addEditTask(addOrEdit, task) {

            if(addOrEdit === 'edit') {
                this.getTask(task)
            } else {
                this.tasks.unshift({
                task_id: this.lastId(),
                task_name: this.task_field.task_name,
                stat: "Traitment",
                creator: localStorage.getItem('username'),
                asignTo: this.task_field.asignTo,
                importance: this.task_field.importance,
                })
            }
            this.dialog = false
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        },
        cancelEdit() {
            
            this.getTask(this.taskToEdit)
            this.dialog = false
        },
        checkTask(task) {
            task.stat === "Traitment" ? task.stat = "Done" : task.stat = "Traitment"

            let tasks_filtred =  this.tasks.filter(t => t.task_id === task.task_id)
            tasks_filtred.stat = task.stat
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        },
        deleteTask(task) {

            let tasks_filtred = this.tasks.filter((t, i) => {
                this.tasks.splice(i, 1)
                // console.log(task);
                return t.task_id === task.task_id
            })
            console.log(this.tasks_filtred);
            let deletedTask = JSON.parse(localStorage.getItem('deletedTask')) || []
            deletedTask.unshift(tasks_filtred)
            localStorage.setItem('deletedTask', JSON.stringify(deletedTask))
            localStorage.setItem('tasks', JSON.stringify(this.tasks))

            this.task_field.task_name = task.task_name
            this.snackbar = true
        },
        lastId(){
            let id = 0
            // console.log(this.tasks);
            for (const index in this.tasks) {
                id = index
            }
            return id
        },
        snackbarChnage() {
            this.snackbar = false
        },
        chipColor(importance) {
            
            if(importance === 'Urgent') return 'red'
            if(importance === 'Important') return 'warning'
            return 'primary'
        },
        getTask(task) {
            let index = 0
            let tasks_filtred = this.tasks.filter((t, i) => {
                index = i
                t.task_id === task.task_id
            })
            this.tasks[index] = tasks_filtred
        }
    },
}