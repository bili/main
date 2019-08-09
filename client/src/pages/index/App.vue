<template>
    <section>
        <chat-window/>
    </section>
</template>

<script>
export default {
    name: 'App',
    components: {
        ChatWindow: () => import('@component/ChatWindow')
    },
    mounted() {
    }
}
</script>

<style>

</style>
