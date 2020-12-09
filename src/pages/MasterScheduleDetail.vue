<template>
  <div v-if="user.role === 'admin'">
    <div class="row">
      <div class="col-md-4">
        <router-link
          class="btn btn-primary"
          :to="{
            name: 'schedule_form',
            params: { id: this.$route.params.id },
          }"
          ><span class="fa fa-pencil"></span>&nbsp;Edit</router-link
        >
        &nbsp;
        <button
          class="btn btn-danger"
          href="javascript:;"
          @click="deleteschedule(schedules[0].id)"
        >
          <span class="fa fa-trash"></span> Delete
        </button>
        <br />
        <br />

        <box
          title="Detail Jadwal Ujian"
          footer="true"
          :back="{ name: 'master_schedules' }"
        >
          <div v-for="schedule in getData($route.params.id)" :key="schedule.id">
            <h3>
              <b>{{ schedule.title }}</b>
            </h3>
            <p>
              {{ schedule.level_name }} <b>{{ schedule.category_name }}</b>
            </p>
            <hr />
            <h4>
              <i class="fa fa-calendar fa-lg" style="color: #999"></i>
              {{ moment(schedule.start).format("D MMMM YYYY HH:mm") }} -
              {{ moment(schedule.end).format("D MMMM YYYY HH:mm") }}
            </h4>
            <h4>
              <i class="fa fa-clock fa-lg" style="color: #999"></i>
              {{ schedule.durasi }} Minutes
            </h4>
            <h4>
              <i class="fa fa-book fa-lg" style="color: #999"></i>
              {{ schedule.jumlah_soal }} Soal
            </h4>
            
            <div v-if="moment(schedule.end) < moment()">
              <span class="label label-warning pull-right" style="margin-left: 5px;">EXPIRED</span>
            </div>
            <div v-else>
              <span class="label label-primary pull-right" style="margin-left: 5px;">LIVE</span>
            </div>
            
            <div v-if="schedule.status === 1">
              <span class="label label-success pull-right">ACTIVE</span>
            </div>
            <div v-else-if="schedule.status === 0">
              <span class="label label-danger pull-right">DIBATALKAN</span>
            </div>
            <div v-else-if="schedule.status === 2">
              <span class="label label-warning pull-right">PENDING</span>
            </div>


          </div>
        </box>
      </div>
      <div class="col-md-8">
        <router-link
          class="btn btn-default"
          :to="{
            name: 'schedule_assign',
            params: { id: this.$route.params.id },
          }"
          ><span class="fa fa-plus-circle"></span>&nbsp;Assign
          Peserta</router-link
        >
        <br />
        <br />
        <datatable :config="config" @click="onRowClick" />
      </div>
    </div>
  </div>
</template>

<script>
import Box from "../components/Box.vue";
export default {
  components: { Box },
  data() {
    return {
      schedules: [],
      user: [],
      config: {
        title: "Daftar Peserta",
        columns: [
          {
            title: "Nama Peserta",
            data: "user_name",
          },
          {
            title: "Jadwal Ujian / Test Online",
            data: "schedule_name",
          },
        ],
        data: [],
      },
    };
  },

  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });

    this.Api.get("/user_schedules_all/" + this.$route.params.id).then((res) => {
      // window.console.log(res.data.schedules)
      this.config.data = res.data.user_schedules;
    });

    return this.Api.get("/schedules/" + this.$route.params.id).then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.schedules = res.data.schedules;
      // window.console.log(this.schedules[0])
    });
  },

  methods: {
    getData(id) {
      let data = this.schedules;
      return data.filter((schedule) => {
        return schedule.id == id;
      });
    },
    deleteschedule(id) {
      if (confirm("Do you really want to delete?")) {
        this.Api.delete("/schedules/" + this.$route.params.id).then(
          (response) => {
            let i = this.schedules.map((item) => item.id).indexOf(id); // find index of your object
            this.schedules.splice(i, 1);
            this.$router.push({ name: "master_schedules" });
          }
        );
      }
    },
    onRowClick(row) {
      // window.console.log(row[0])
      // window.console.log(this.config.data[row[0]].id)
      this.$router.push({
        name: "schedule_detail_peserta",
        params: { id: this.config.data[row[0]].id },
      });
    },
  },
};
</script>
<style>
/* tr {
  width: 100%;
}
th {
  width: 40%;
}
td {
  width: 60%;
} */

h4 {
  padding: 5px;
}
</style>