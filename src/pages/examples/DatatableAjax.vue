<template>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="card-header bg-info text-white">
              <h4 class="card-title m-b-0 text-white">Partial Config</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                    <datatable :config="config"/>
              </div>
            </div>
        </div>
      </div>
    </div>
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
