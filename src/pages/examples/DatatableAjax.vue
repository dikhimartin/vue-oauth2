<template>
  <datatable :config="config"/>
</template>

<script>
export default {
    data() {
        return {
            config: {
                title: "Github Repository API - Example",
                searchKey: 'q',
                searchDefault: 'vuejs',
                pageStartAt: 1,
                simpleSort: false,
                url: "https://api.github.com/search/repositories",
                columns: [{
                    title: "Repository Name",
                    data: "name",
                    render: (value, type, row) => {
                        return '<img src="'+row.owner.avatar_url+'" width="30" style="border-radius: 100%" alt="image"/> '
                            + value
                    }
                }, {
                    title: "Size (Kb)",
                    data: "size"
                }]
            }
        }
    }
}
</script>
