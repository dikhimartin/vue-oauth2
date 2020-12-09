<template>
  <div v-if="user.role === 'admin'">
    <router-link class="btn btn-success" :to="{ name: 'peserta_add' }"
      ><span class="fa fa-plus"></span> Add peserta</router-link
    >
    <br>
    <br>
    <datatable :config="config" @click="onRowClick" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        title: "Peserta",
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

    return this.Api.get("/users_peserta").then((res) => {
      // window.console.log(res.data.schedules)
      this.config.data = res.data.users;
    });
  },
  methods: {
    onRowClick(row) {
      // window.console.log(row[0])
      // window.console.log(this.config.data[row[0]].id)
      this.$router.push({
        name: "peserta_detail",
        params: { id: this.config.data[row[0]].id },
      });
    },
  },
};
</script>
