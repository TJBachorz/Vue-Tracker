<template>
    <header>
        <h1>{{ title }}</h1>
        <Button @toggle-task-form="$emit('toggle-task-form')" text="Add Task" color="green"/>
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
        }
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


