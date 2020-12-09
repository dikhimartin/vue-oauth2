<template>
<div v-if="user.role === 'admin'">
  <div>
    <router-link class="btn btn-success" :to="{ name: 'jadwal_peserta_add' }"
      ><span class="fa fa-plus"></span> Add Jadwal Peserta</router-link
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
        title: "Jadwal Peserta",
        columns: [
          {
            title: "Nama Peserta",
            data: "user_name",
          },
          {
            title: "Jadwal Ujian / Test Online",
            data: "schedule_name",
          }
        ],
        data: [],
      },
      user: [],
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });

    return this.Api.get("/user_schedules_all").then((res) => {
      // window.console.log(res.data.schedules)
      this.config.data = res.data.user_schedules;
    });
  },
  methods: {
    onRowClick(row) {
      // window.console.log(row[0])
      // window.console.log(this.config.data[row[0]].id)
      this.$router.push({
        name: "jadwal_peserta_detail",
        params: { id: this.config.data[row[0]].id },
      });
    },
  },
};
</script>
