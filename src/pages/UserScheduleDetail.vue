<template>
  <div v-if="user.role === 'admin'">
    <box
      title="Detail Jadwal Peserta"
      footer="true"
      :back="{ name: 'master_jadwal_peserta' }"
    >
      <router-link
        class="btn btn-primary"
        :to="{
          name: 'jadwal_peserta_form',
          params: { id: this.$route.params.id },
        }"
        ><span class="fa fa-pencil"></span>&nbsp;Edit</router-link
      >
      &nbsp;
      <button
        class="btn btn-danger"
        href="javascript:;"
        @click="deleteuser(user_schedules[0].id)"
      >
        <span class="fa fa-trash"></span> Delete
      </button>

      <table
        v-for="user_schedule in getData($route.params.id)"
        :key="user_schedule.id"
        id="w0"
        class="table"
        style="width: 100%"
      >
        <h3>{{ user_schedule.user_name }}</h3>
        <tr>
          <th>ID</th>
          <td>: {{ user_schedule.id }}</td>
        </tr>
        <tr>
          <th>Nama Peserta</th>
          <td>: {{ user_schedule.user_name }}</td>
        </tr>
        <tr>
          <th>Jadwal</th>
          <td>: {{ user_schedule.schedule_name }}</td>
        </tr>
        <tr>
          <th>Created at</th>
          <td>: {{ user_schedule.created_at }}</td>
        </tr>
        <tr>
          <th>Updated at</th>
          <td>: {{ user_schedule.updated_at }}</td>
        </tr>
      </table>
    </box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_schedules: [],
      user: [],
    };
  },

  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });
    return this.Api.get(
      "/user_schedules_details/" + this.$route.params.id
    ).then((res) => {
      // window.console.log(res.data.user_schedules)
      //window.console.log(this.$route.params.id)
      this.user_schedules = res.data.user_schedules;
      // window.console.log(this.user_schedules.fullname)
    });
  },

  methods: {
    getData(id) {
      let data = this.user_schedules;
      return data.filter((user) => {
        return user.id == id;
      });
    },
    deleteuser(id) {
      if (confirm("Do you really want to delete?")) {
        this.Api.delete("/user_schedules/" + this.$route.params.id).then(
          (response) => {
            let i = this.user_schedules.map((item) => item.id).indexOf(id); // find index of your object
            this.user_schedules.splice(i, 1);
            this.$router.push({ name: "master_jadwal_peserta" });
          }
        );
      }
    },
  },
};
</script>

<style>
tr {
  width: 100%;
}
th {
  width: 40%;
}
td {
  width: 60%;
}
</style>