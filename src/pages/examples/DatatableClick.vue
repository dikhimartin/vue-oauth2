<template>
    <datatable :config="config" @click="onRowClicked"/>
</template>

<script>
export default {
    data() {
        return {
            config: {
                title: "Clickable Row",
                icon: "fa fa-circle-o",
                columns: [
                    {
                        "title": "Full Name",
                        "data": "full_name"
                    }
                ],
                data: [
                    {
                        full_name: "John Doe"
                    },
                    {
                        full_name: "Jane Doe"
                    }
                ]
            }
        }
    },
    methods: {
        onRowClicked(row) {
            bootbox.alert(row.data().full_name + ' clicked')
        }
    }
}
</script>
