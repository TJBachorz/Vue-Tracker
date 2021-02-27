<template>
    <button 
        @click="$emit('toggle-task-form')" 
        class="btn" 
        :style="{background: color}"
    >
        {{ text }}
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            text: String,
            color: String
        },
    }
</script>