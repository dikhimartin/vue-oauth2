<template>
<div v-if="user.role === 'user'">
    <datatable :config="config" @click="onRowClick" />
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
          // {
          //   title: "Level",
          //   data: "level_name",
          // },
          // {
          //   title: "Kategori",
          //   data: "category_name",
          // },
          // {
          //   title: "Jumlah Soal",
          //   data: "jumlah_soal",
          // },
          // {
          //   title: "Status",
          //   data: "status",
          //   render: function(data, type, row){
          //       if ( row.status === 1) {
          //         return '<span class="label label-success">ACTIVE</span>';
          //       } else if(row.status === 0) {
          //         return '<span class="label label-danger">DIBATALKAN</span>';
          //       }
          //       // return moment(data).format("dddd, D MMMM YYYY - HH:mm");
          //   },
          // },
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
        user_jadwal: [] 
      },
      user:[]
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      
      if (this.user.status != 1) {
        // this.$router.go(0);
        this.Api.logout();
      }
      //window.console.log(this.user.role)
    });

    return this.Api.get("/schedules_peserta").then((res) => {
      // window.console.log(res.data.schedules)
      this.config.data = res.data.schedules;
    });
  },
  methods: {
    onRowClick(row) {
      // window.console.log(row[0])
      // window.console.log(this.config.data[row[0]].id)

      this.Api.get("/user_schedules/" + this.config.data[row[0]].id)
        .then((res) => {
          // window.console.log(res.data.schedules)
          this.user_jadwal = res.data.user_schedules[0];
          // this.user_jadwal.user_id = res.data.user_schedules[0].user_id;

          // window.console.log(this.user_jadwal)

          if (this.user_jadwal == null) {
            alert("Kamu tidak terdaftar pada Ujian ini");
          }

          if (moment(this.config.data[row[0]].end) < moment()) {
            alert("Waktu Ujian Sudah Terlewat");
            return;
          } 
          
          if (moment(this.config.data[row[0]].start) > moment()) {
            alert("Ujian Belum Dimulai");
            return;
          }
          
          if (this.config.data[row[0]].id != this.user_jadwal.schedule_id) {
            alert("Kamu tidak terdaftar pada Ujian ini");
          }
          
          if (this.config.data[row[0]].id == this.user_jadwal.schedule_id &&
            this.user.id == this.user_jadwal.user_id
          ) {

              this.$router.replace({
                name: "test",
                params: { id: this.config.data[row[0]].id },
              });
          }
        });
    },
  },
};
</script>
