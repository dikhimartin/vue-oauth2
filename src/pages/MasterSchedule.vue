<template>
<div v-if="user.role === 'admin'">
  <div v-if="user.role === 'admin'">
    <router-link class="btn btn-success" :to="{ name: 'schedule_add' }"
      ><span class="fa fa-plus"></span> Add Jadwal Ujian</router-link
    >
    <br>
    <br>
    <datatable :config="config" @click="onRowClick" />
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        title: "Bank Soal",
        columns: [
          {
            title: "Judul",
            data: "title",
          },
          {
            title: "Start",
            data: "start",
            render: function(data, type, row){
                if(type === "sort" || type === "type"){
                    return data;
                }
                return moment(data).format("dddd, D MMMM YYYY - HH:mm");
            },
          },
          {
            title: "End",
            data: "end",
            render: function(data, type, row){
                if(type === "sort" || type === "type"){
                    return data;
                }
                return moment(data).format("dddd, D MMMM YYYY - HH:mm");
            },
          },
           {
            title: "Durasi (menit)",
            data: "durasi",
          },
          {
            title: "Level",
            data: "level_name",
          },
          {
            title: "Kategori",
            data: "category_name",
          },
          {
            title: "Jumlah Soal",
            data: "jumlah_soal",
          },
          {
            title: "Status",
            data: "status",
            render: function(data, type, row){
                if ( row.status === 1) {
                  return '<span class="label label-success">ACTIVE</span>';
                } else if(row.status === 0) {
                  return '<span class="label label-danger">DIBATALKAN</span>';
                } else if(row.status === 2) {
                  return '<span class="label label-warning">PENDING</span>';
                }
                // return moment(data).format("dddd, D MMMM YYYY - HH:mm");
            },
          },
          {
            title: "",
            data: "end",
            render: function(data, type, row){
                if ( moment(data) < moment()) {
                  return '<span class="label label-warning">EXPIRED</span>';
                } else {
                  return '<span class="label label-primary">LIVE</span>';
                }
                // return moment(data).format("dddd, D MMMM YYYY - HH:mm");
            },
          }
        ],
        order: [[1, "desc"]],
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

    return this.Api.get("/schedules").then((res) => {
      // window.console.log(res.data.schedules)
      this.config.data = res.data.schedules;
    });
  },
  methods: {
    onRowClick(row) {
      // window.console.log(row[0])
      // window.console.log(this.config.data[row[0]].id)
      this.$router.push({
        name: "schedule_detail",
        params: { id: this.config.data[row[0]].id },
      });
    },
  },
};
</script>
