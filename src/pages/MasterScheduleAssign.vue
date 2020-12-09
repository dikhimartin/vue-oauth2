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
            
            <input type="hidden" v-model="user_schedules.schedule_id">

            <div
              class="form-group has-feedback"
              :class="{ 'has-error': error.user_id }"
            >
              <label>Peserta</label>
              <!-- <select class="form-control" v-model="question.level_name"></select> -->
              <select2
                class="form-control"
                v-model="user_schedules.user_id"
              >
                <option value="">Select Peserta</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.fullname }}
                </option>
              </select2>
              <span class="form-control-feedback"></span>
              <p class="help help-block" v-if="error.user_id">
                <i class="fa fa-info-circle"></i> {{ error.user_id }}
              </p>
            </div>
            
            <button type="submit" class="btn btn-primary">
              Assign Peserta
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
        user_id: null,
        schedule_id: this.$route.params.id,
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

    this.Api.get("/schedules/" + this.$route.params.id).then((res) => {
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
      if (!this.user_schedules.user_id) {
        this.error.user_id = "Peserta masih kosong";
        return;
      }
      if (!this.user_schedules.schedule_id) {
        this.error.schedule_id = "Jadwal masih kosong";
        return;
      }

      this.Api.post("/user_schedules_cek_unique", this.user_schedules).then((response) => {
        if(response.data.message ==  false){
          this.error.user_id = "Peserta sudah didaftarkan";
        } else {
          this.Api.post("/user_schedules", this.user_schedules).then((response) => {
            this.$router.push({ name: "schedule_detail", params: { id:  this.$route.params.id} });
          });
          this.Api.post("/schedules/" + this.$route.params.id, {
            title: this.schedules[0].title,
            start: this.schedules[0].start,
            end: this.schedules[0].end,
            durasi: this.schedules[0].durasi,
            level_id: this.schedules[0].level_id,
            category_id: this.schedules[0].category_id,
            jumlah_soal: this.schedules[0].jumlah_soal,
            status: this.schedules[0].status = 2,
            _method: "put", // <== add this field
          }).then((res) => {});
        }
      });
      

      // this.errors = [];

      e.preventDefault();
    },
  },
};
</script>