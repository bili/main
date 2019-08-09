<template>
    <section>
        chat-window
        <message v-for="(item, index) in messages" :key="index" :msg="item"></message>
    </section>
</template>

<script>
import Message from '@component/message'
export default {
    name: 'chat-window',
    components: {
        Message
    },
    data() {
        return {
            messages: [
                {text: 1},
                {text: 2},
                {text: 3},
            ]
        }
    }
}
</script>

<style>

</style>
