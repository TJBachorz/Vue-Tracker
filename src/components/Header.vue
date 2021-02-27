<template>
    <header>
        <h1>{{ title }}</h1>
        <Button 
            @button-click="$emit('toggle-task-form')" 
            :text="showAddTask ? 'Close' : 'Add Task'" 
            :color="showAddTask ? 'red' : 'green'"
        />
    </header>
</template>

<script>
import Button from './Button'

export default {
    name: 'Header',
    props: {
        title: {
            type: String,
            default: "Task Tracker"
        },
        showAddTask: Boolean
    },
    components: {
        Button
    },
    emits: ['toggle-task-form']
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>


