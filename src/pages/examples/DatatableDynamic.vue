<template>
    <datatable :config="config"/>
</template>

<script>
export default {
    data() {
        return {
            config: {
                title: "Dynamic Table",
                icon: "fa fa-circle-o",
                columns: [
                    {
                        "title": "Full Name",
                        "data": "full_name"
                    }
                ],
                order: [[0, "desc"]],
                data: []
            }
        }
    },
    mounted() {
        this.clearUser()
        this.addUser()
        let i = setInterval(() => {
            if (this.config.data.length <= 11) {
                this.addUser()
            } else {
                this.clearUser()
            }
        }, 1000)
    },
    methods: {
        addUser() {
            this.config.data.push({full_name: 'User ' + this.config.data.length})
        },
        clearUser() {
            this.config.data.splice(0, this.config.data.length)
        }
    }
}
</script>
