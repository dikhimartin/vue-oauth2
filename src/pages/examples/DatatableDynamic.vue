<template>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="card-header bg-info text-white">
              <h4 class="card-title m-b-0 text-white">Dynamic Table</h4>
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
