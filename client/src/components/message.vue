<template>
    <div>
        {{text}}
    </div>
</template>

<script>
export default {
    name: 'message',
    props: ['msg'],
    computed: {
        text() {
            return this.msg.text || ''
        }
    }
}
</script>

<style>

</style>
