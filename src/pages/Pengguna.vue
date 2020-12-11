<template>
  <div v-if="user.role === 'admin'">
    
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="card">
            <div class="card-header bg-info text-white">
              <h4 class="card-title m-b-0 text-white">List Data</h4>
            </div>
            <div class="card-body">
              <div class="row">
                  <div class="col-md-12">
                    <div class="button-group">
                        <router-link class="btn btn-info btn-sm waves-light" :to="{ name: 'pengguna_add' }"
                          ><span class="btn-label"><i class="fa fa-plus"></i></span>&nbsp;Add New
                        </router-link>
                    </div>
                  </div>
              </div>
              <p style="margin-bottom: 20px;"></p>
              <div class="table-responsive">
                  <table class="table table-hover">
                     <datatable :config="config" @click="onRowClick" />
                  </table>
              </div>
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
        title: "Pengguna",
        columns: [
          {
            title: "Fullname",
            data: "fullname",
          },
          {
            title: "Email",
            data: "email",
          },
          {
            title: "City",
            data: "city",
          },
          {
            title: "Role",
            data: "role",
          },
          // {
          //   title: "Start",
          //   data: "start",
          //   render: function(data, type, row){
          //       if(type === "sort" || type === "type"){
          //           return data;
          //       }
          //       return moment(data).format("dddd, D MMMM YYYY - HH:mm");
          //   },
          // },
          // {
          //   title: "End",
          //   data: "end",
          //   render: function(data, type, row){
          //       if(type === "sort" || type === "type"){
          //           return data;
          //       }
          //       return moment(data).format("dddd, D MMMM YYYY - HH:mm");
          //   },
          // },
          {
            title: "Status",
            data: "status",
            render: function(data, type, row){
                if ( row.status === 1) {
                  return '<span class="label label-success">ACTIVE</span>';
                } else {
                  return '<span class="label label-danger">INACTIVE</span>';
                }
                // return moment(data).format("dddd, D MMMM YYYY - HH:mm");
            },
          }
        ],
        data: [],
      },
      user:[]
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });

    return this.Api.get("/users_pengguna").then((res) => {
      // window.console.log(res.data.schedules)
      this.config.data = res.data.users;
    });
  },
  methods: {
    onRowClick(row) {
      // window.console.log(row[0])
      // window.console.log(this.config.data[row[0]].id)
      this.$router.push({
        name: "pengguna_detail",
        params: { id: this.config.data[row[0]].id },
      });
    },
  },
};
</script>
