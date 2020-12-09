<template>
<div v-if="user.role === 'admin'">
  <box
    title="Form Jadwal Ujian"
    footer="true"
    :back="{ name: 'master_schedules' }"
  >
    <div class="row">
      <div
        v-for="schedule in getData($route.params.id)"
        :key="schedule.id"
        class="col-md-4"
      >
        <form @submit.prevent="updateSchedule" enctype="multipart/form-data">
          <div class="form-group has-feedback"
            :class="{ 'has-error': error.title }"
          >
            <label>Judul Ujian</label>
            <input type="text" class="form-control" v-model="schedule.title" />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.title">
              <i class="fa fa-info-circle"></i> {{ error.title }}
            </p>
          </div>
          <div class="form-group has-feedback"
            :class="{ 'has-error': error.start }"
          >
            <label>Start</label>
            <!-- <input type="datetime" class="form-control" v-model="schedules.start" /> -->
            <!-- formatted="YYYY-MM-DD HH:mm:ss" -->
            <VueCtkDateTimePicker v-model="schedule.start" formatted="YYYY-MM-DD HH:mm" format="YYYY-MM-DD HH:mm" @input="inputMulai()" />
             <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.start">
              <i class="fa fa-info-circle"></i> {{ error.start }}
            </p>
          </div>
          
          <div class="form-group has-feedback"
            :class="{ 'has-error': error.durasi }"
          >
            <label>Durasi <b style="color:red;">(Minutes)</b></label>
            <input id="durasi" type="number" class="form-control" v-model="schedule.durasi" @input="inputDurasi(schedule.durasi)" />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.durasi">
              <i class="fa fa-info-circle"></i> {{ error.durasi }}
            </p>
          </div>

          <!-- <div class="form-group">
            <label>End</label>
            <input type="datetime" class="form-control" v-model="schedules.end" /> -->
            <VueCtkDateTimePicker no-label hidden disabled="true" v-model="schedule.end" formatted="YYYY-MM-DD HH:mm" format="YYYY-MM-DD HH:mm" />          
          <!-- </div> -->

          <div
            class="form-group has-feedback"
            :class="{ 'has-error': error.level_id }"
          >
            <label>Tingkatan</label>
            <!-- <select class="form-control" v-model="question.level_name"></select> -->
            <select2 class="form-control" v-model="schedule.level_id">
              <option value="">Select Level</option>
              <option
                v-for="questionlevel in questionlevels"
                :key="questionlevel.id"
                :value="questionlevel.id"
              >
                {{ questionlevel.name }}
              </option>
            </select2>
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.level_id">
              <i class="fa fa-info-circle"></i> {{ error.level_id }}
            </p>
          </div>
          <div class="form-group has-feedback"
            :class="{ 'has-error': error.category_id }"
          >
            <label>Kategori</label>
            <select2 class="form-control" v-model="schedule.category_id">
              <option value="">Select Category</option>
              <option
                v-for="questioncategory in questioncategories"
                :key="questioncategory.id"
                :value="questioncategory.id"
              >
                {{ questioncategory.name }}
              </option>
            </select2>
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.category_id">
              <i class="fa fa-info-circle"></i> {{ error.category_id}}
            </p>
          </div>

          <div class="form-group has-feedback"
            :class="{ 'has-error': error.jumlah_soal }"
          >
            <label>Jumlah Soal</label>
            <input type="number" class="form-control" v-model="schedule.jumlah_soal" />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.jumlah_soal">
              <i class="fa fa-info-circle"></i> {{ error.jumlah_soal }}
            </p>
            <b v-if="error.jumlah_soal && max">Maksimal = {{ max }}</b>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="schedule.status">
              <!-- <option value="">Select Status</option> -->
              <option value="1">Active</option>
              <option value="0">Dibatalkan</option>
              <option value="2">Pending</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Update Schedule</button>
        </form>
      </div>
    </div>
  </box>
</div>
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

export default {
  data() {
    return {
      schedules: [],
      error: {
        title: null,
        start: null,
        end: null,
        durasi: null,
        category_id: null,
        level_id: null,
        jumlah_soal: null
      },
      user: [],
      questioncategories: {},
      questionlevels: {},
      max: 0
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });

     this.Api.get("/questionlevels").then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.questionlevels = res.data.question_levels;
      //   window.console.log(this.question[0])
    });
    // this.onFileChanged

    this.Api.get("/questioncategories").then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.questioncategories = res.data.question_categories;
      //   window.console.log(this.question[0])
    });

    this.Api.get("/schedules/" + this.$route.params.id).then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.schedules = res.data.schedules;
      //   window.console.log(this.question[0]);
      //   return this.question.title;
    });

  },
  methods: {
    clearError() {
      this.error.title = null;
      this.error.start = null;
      // this.error.end = null;
      this.error.durasi = null;
      this.error.level_id = null;
      this.error.category_id = null;
      this.error.jumlah_soal = null; 

    },
    updateSchedule(e) {
      this.clearError();
      if (!this.schedules[0].title) {
        this.error.title = "Judul masih kosong";
        return;
      }
      if (!this.schedules[0].start) {
        this.error.start = "Start masih kosong";
        return;
      }
      // if (!this.schedules.end) {
      //   this.error.end = "End masih kosong";
      //   return;
      // }
      if (!this.schedules[0].durasi) {
        this.error.durasi = "Durasi masih kosong";
        return;
      }
      if (!this.schedules[0].level_id) {
        this.error.level_id = "Level masih kosong";
        return;
      }
      if (!this.schedules[0].category_id) {
        this.error.category_id = "Kategori masih kosong";
        return;
      }

      if (!this.schedules[0].jumlah_soal) {
        this.error.jumlah_soal = "Jumlah Soal masih kosong";
        return;
      }

      this.Api.post("/schedules_countsoal", {

        level_id: this.schedules[0].level_id,
        category_id: this.schedules[0].category_id

      }).then((res) => {
        // if(this.schedules.category_id = res.data.questions.category_id){
        //   this.error.jumlah_soal = "Jumlah Soal Melebihi Batas Maksimal";
        // }
        this.max = res.data;

        if((this.schedules[0].jumlah_soal > res.data) && (res.data > 0)) {    
            this.error.jumlah_soal = "Jumlah Soal Melebihi Batas. ";
        } else if(res.data === 0) {
            this.error.jumlah_soal = "Level dan Kategori tidak ada di Bank Soal. ";
        } else {
      
          this.Api.put("/schedules/" + this.$route.params.id, {
            // <== use axios.post
            // headers:{'Content-Type' : 'multipart/form-data'},
            // fd,
            title: this.schedules[0].title,
            start: this.schedules[0].start,
            end: this.schedules[0].end,
            durasi: this.schedules[0].durasi,
            level_id: this.schedules[0].level_id,
            category_id: this.schedules[0].category_id,
            jumlah_soal: this.schedules[0].jumlah_soal,
            status: this.schedules[0].status,
            // _method: "put", // <== add this field
          }).then((res) => {
            // window.console.log(res.data.schedules)
            //window.console.log(this.$route.params.id)
            //this.questions = res.data.questions;
            // window.console.log(this.questions[0])
            this.$router.push({ name: "master_schedules" });
            e.preventDefault();
          });

        }

      });

    },
    inputMulai() {
      this.schedules[0].durasi = "";
      this.schedules[0].end = "";
    },
    inputDurasi(how) {
      // var timevalue = moment(this.schedules.start, 'HH:mm:ss');
      // var datevalue = moment(this.schedules.start, 'YYYY-MM-DD');
      // var time = moment(datevalue + ', ' + timevalue);

      // var newTime = moment(time).add('m', how);
      // // console.log(newTime.format("dddd, MMMM Do YYYY, h:mm:ss a"));
      
      // this.schedules.end = newTime.format("YYYY-MM-DD HH:mm:ss");

      // var startdate = this.schedules.start; 
      var end = moment(this.schedules[0].start).add(how, 'minutes');
      this.schedules[0].end = end.format('YYYY-MM-DD HH:mm:ss');
    },
    getData(id) {
      let data = this.schedules;
      return data.filter((schedule) => {
        return schedule.id == id;
      });
    },
  },
};
</script>
