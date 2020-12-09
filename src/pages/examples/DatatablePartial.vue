<template>
    <datatable title="Partial Config" :columns="columns" :data="data"/>
</template>

<script>
export default {
    data() {
        return {
            columns: [],
            data: []
        }
    },
    mounted() {
        setTimeout(() => {
            this.columns = [
                {
                    "title": "Full Name",
                    "data": "full_name"
                }
            ]
        }, 3000)
        setTimeout(() => {
            this.data = [
                {
                    full_name: "John Doe"
                },
                {
                    full_name: "Jane Doe"
                }
            ]
        }, 4000)
    }
}
</script>
