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
    mounted() {
        /*const res = await fetch('./tasks.json');
        const data = await res.json();
        this.tasks = data;*/
        this.tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    },
    methods: {
        deleteTask(t) {
            this.tasks = this.tasks.filter(task => task.id !== t.id);
            this.updateLocalStorage();
        },
        
        doneTask(t) {
            this.tasks = this.tasks.filter(task => {
                if (task.id === t.id) {
                    task.done = true;
                }                
                this.updateLocalStorage();
                return task;
            });
        },
        
        unDoneTask(t) {
            this.tasks = this.tasks.filter(task => {
                if (task.id === t.id) {
                    task.done = false;
                }
                this.updateLocalStorage();
                return task;
            });
        },

        onSubmit() {
            if(this.title === '' || this.description === '') {
                alert('You must fill all fields');
            } else {
                this.tasks.push({
                    id: Date.now(),
                    title: this.title,
                    description: this.description,
                    done: false
                });
                this.title = '';
                this.description = '';
                this.updateLocalStorage();
            }
        },

        updateLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
    
});


app.mount('#app')