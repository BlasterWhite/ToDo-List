const { createApp } = Vue

const app = createApp({
    data() {
        return {
            message: 'Hello Vue!',
            tasks: [],
            title: '',
            description: ''
        }
    }, 
    async mounted() {
        const res = await fetch('./tasks.json');
        const data = await res.json();
        this.tasks = data;
    },
    methods: {
        deleteTask(t) {
            this.tasks = this.tasks.filter(task => task.id !== t.id);
        },
        
        doneTask(t) {
            this.tasks = this.tasks.filter(task => {
                if (task.id === t.id) {
                    task.done = true;
                }
                return task;
            });
        },
        
        unDoneTask(t) {
            this.tasks = this.tasks.filter(task => {
                if (task.id === t.id) {
                    task.done = false;
                }
                return task;
            });
        },

        onSubmit() {
            if(this.title === '' || this.description === '') {
                alert('You must fill all fields');
            } else {
                this.tasks.push({
                    id: this.tasks.length + 1,
                    title: this.title,
                    description: this.description,
                    done: false
                });
                this.title = '';
                this.description = '';
            }
        }
    }
})



app.mount('#app')