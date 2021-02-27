<template>
  <div class="container">
    <Header 
      :showAddTask="showAddTask"
      @toggle-task-form="toggleTaskForm"
    />
    <div v-if="showAddTask">
      <AddTask @add-task="addTask" />
    </div>
    <Tasks 
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask" 
      :tasks="tasks"
    />
  </div>
</template>

<script>
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

export default {
  name: "App",
  components: {
    Header,
    Tasks,
    AddTask
  },
  data() {
    return {
      tasks: [],
      showAddTask: false,
    }
  },
  methods: {
    toggleTaskForm() {
      this.showAddTask = !this.showAddTask
    },
    async addTask(newTask) {
      const response = await fetch('JSON_API/tasks', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask)
      })

      const data = await response.json()
      
      this.tasks = [...this.tasks, data]
    },
    deleteTask(id) {
      fetch(`JSON_API/tasks/${id}`, { method: "DELETE" })
        .then(response => {
          return response.status === 200 ?
            this.tasks = this.tasks.filter(task => task.id !== id)
            : alert("Error deleting task")
        })

    },
    async toggleReminder(id) {
      const targetTask = await this.fetchTask(id)
      const updatedTask = {
        ...targetTask,
        reminder: !targetTask.reminder
      }

      fetch(`JSON_API/tasks/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      }).then(response => response.json())
      .then(newTask => {
        this.tasks = this.tasks.map(task => {
          return task.id === id ? 
            { ...task, reminder: newTask.reminder}
            : task
        })
      })

    },
    fetchTasks() {
      return fetch('JSON_API/tasks')
        .then(response => response.json())
    },
    fetchTask(id) {
      return fetch(`JSON_API/tasks/${id}`)
        .then(response => response.json())
    },
  },
  async created() {
    this.tasks = await this.fetchTasks()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
