<template>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="card-header bg-info text-white">
              <h4 class="card-title m-b-0 text-white">Partial Config</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                    <datatable title="Partial Config" :columns="columns" :data="data"/>
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
