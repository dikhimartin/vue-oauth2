<template>
    <datatable :config="config"/>
</template>

<script>
export default {
    data() {
        return {
            config: {
                title: "Static Table",
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
    }
}
</script>
