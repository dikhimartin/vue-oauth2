<template>
  <div v-if="user.role === 'admin'">
    <box
      title="Form Jadwal Peserta"
      footer="true"
      :back="{ name: 'master_jadwal_peserta' }"
    >
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="addUserSchedule" enctype="multipart/form-data">
            <div
              class="form-group has-feedback"
              :class="{ 'has-error': error.user_id }"
            >
              <label>Peserta</label>
              <!-- <select class="form-control" v-model="question.level_name"></select> -->
              <select
                class="form-control"
                v-model="user_schedules.user_id"
                multiple="multiple"
              >
                <!-- <option value="">Select Level</option> -->
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.fullname }}
                </option>
              </select>
              <span class="form-control-feedback"></span>
              <p class="help help-block" v-if="error.user_id">
                <i class="fa fa-info-circle"></i> {{ error.user_id }}
              </p>
            </div>
            <div
              class="form-group has-feedback"
              :class="{ 'has-error': error.schedule_id }"
            >
              <label>Jadwal</label>
              <!-- <select class="form-control" v-model="user_schedules.schedule_id">
              <option
                v-for="schedule in schedules"
                :key="schedule.id"
                :value="schedule.id"
              >
                {{ schedule.title }}
              </option>
            </select> -->
              <select2
                class="form-control"
                v-model="user_schedules.schedule_id"
              >
              <option value="">Select Jadwal</option>
                <option
                  v-for="schedule in schedules"
                  :key="schedule.id"
                  :value="schedule.id"
                >
                  {{ schedule.title }}
                </option>
              </select2>
              <span class="form-control-feedback"></span>
              <p class="help help-block" v-if="error.schedule_id">
                <i class="fa fa-info-circle"></i> {{ error.schedule_id }}
              </p>
            </div>

            <button type="submit" class="btn btn-primary">
              Add Jadwal Peserta
            </button>
          </form>
        </div>
      </div>
    </box>
  </div>
</template>

<script>
// $(document).ready(function () {
//   $("#jadwal").select2();
// });

export default {
  data() {
    return {
      user_schedules: {
        user_id: [],
        schedule_id: null,
      },
      error: {
        user_id: null,
        schedule_id: null,
      },
      users: [],
      schedules: [],
      user: [],
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });
    // this.Api.get("/questions").then((res) => {
    //   // window.console.log(res.data.schedules)
    //   //window.console.log(this.$route.params.id)
    //   this.question = res.data.questions;
    //   //   window.console.log(this.question[0]);
    //   //   return this.question.title;
    // });

    this.Api.get("/schedules_peserta").then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.schedules = res.data.schedules;
      //   window.console.log(this.question[0])
    });

    this.Api.get("/users_peserta").then((res) => {
      // window.console.log(res.data.schedules)
      this.users = res.data.users;
    });
  },
  methods: {
    clearError() {
      this.error.user_id = null;
      this.error.schedule_id = null;
    },
    addUserSchedule(e) {
      this.clearError();
      if (this.user_schedules.user_id.length === 0) {
        this.error.user_id = "Peserta masih kosong";
        return;
      }
      if (!this.user_schedules.schedule_id) {
        this.error.schedule_id = "Jadwal masih kosong";
        return;
      }

      this.Api.post("/user_schedules", this.user_schedules).then((response) => {
        this.$router.push({ name: "master_jadwal_peserta" });
      });

      // this.errors = [];

      e.preventDefault();
    },
  },
};
</script>