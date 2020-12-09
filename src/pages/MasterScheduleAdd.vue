<template>
<div v-if="user.role === 'admin'">
  <box
    title="Form Jadwal Ujian"
    footer="true"
    :back="{ name: 'master_schedules' }"
  >
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="addSchedule">
          <div class="form-group has-feedback"
            :class="{ 'has-error': error.title }"
          >
            <label>Judul Ujian</label>
            <input type="text" class="form-control" v-model="schedules.title" />
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
            <VueCtkDateTimePicker v-model="schedules.start" formatted="YYYY-MM-DD HH:mm" format="YYYY-MM-DD HH:mm" @input="inputMulai()" />
             <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.start">
              <i class="fa fa-info-circle"></i> {{ error.start }}
            </p>
          </div>
          
          <div class="form-group has-feedback"
            :class="{ 'has-error': error.durasi }"
          >
            <label>Durasi <b style="color:red;">(Minutes)</b></label>
            <input id="durasi" type="number" class="form-control" v-model="schedules.durasi" @input="inputDurasi(schedules.durasi)" />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.durasi">
              <i class="fa fa-info-circle"></i> {{ error.durasi }}
            </p>
          </div>

          <!-- <div class="form-group">
            <label>End</label>
            <input type="datetime" class="form-control" v-model="schedules.end" /> -->
            <VueCtkDateTimePicker no-label hidden disabled="true" v-model="schedules.end" formatted="YYYY-MM-DD HH:mm" format="YYYY-MM-DD HH:mm" />          
          <!-- </div> -->

          <div
            class="form-group has-feedback"
            :class="{ 'has-error': error.level_id }"
          >
            <label>Tingkatan</label>
            <!-- <select class="form-control" v-model="question.level_name"></select> -->
            <select2 class="form-control" v-model="schedules.level_id">
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
            <select2 class="form-control" v-model="schedules.category_id">
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
            <input type="number" class="form-control" v-model="schedules.jumlah_soal" />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.jumlah_soal">
              <i class="fa fa-info-circle"></i> {{ error.jumlah_soal }}
            </p>
            <b v-if="error.jumlah_soal && max">Maksimal = {{ max }}</b>
          </div>

          <input type="hidden" v-model="schedules.status" value="2">

          <button type="submit" class="btn btn-primary">Add Schedule</button>
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
      schedules: {
        title: "",
        start: "",
        end: "",
        durasi: null,
        category_id: null,
        level_id: null,
        jumlah_soal: null,
        status: 2
      },
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
      questionlevels: {},
      questioncategories: {},
      max: 0
      // duration: null
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });

    // this.Api.get("/questionlevels").then((res) => {
    //   // window.console.log(res.data.schedules)
    //   //window.console.log(this.$route.params.id)
    //   this.questionlevels = res.data.question_levels;
    //   //   window.console.log(this.question[0])
    // });
    // this.onFileChanged

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
    addSchedule(e) {
      
      this.clearError();
      if (!this.schedules.title) {
        this.error.title = "Judul masih kosong";
        return;
      }
      if (!this.schedules.start) {
        this.error.start = "Start masih kosong";
        return;
      }
      // if (!this.schedules.end) {
      //   this.error.end = "End masih kosong";
      //   return;
      // }
      if (!this.schedules.durasi) {
        this.error.durasi = "Durasi masih kosong";
        return;
      }
      if (!this.schedules.level_id) {
        this.error.level_id = "Level masih kosong";
        return;
      }
      if (!this.schedules.category_id) {
        this.error.category_id = "Kategori masih kosong";
        return;
      }

      if (!this.schedules.jumlah_soal) {
        this.error.jumlah_soal = "Jumlah Soal masih kosong";
        return;
      }

      this.Api.post("/schedules_countsoal", {

        level_id: this.schedules.level_id,
        category_id: this.schedules.category_id

      }).then((res) => {
        // if(this.schedules.category_id = res.data.questions.category_id){
        //   this.error.jumlah_soal = "Jumlah Soal Melebihi Batas Maksimal";
        // }
        this.max = res.data;

        if((this.schedules.jumlah_soal > res.data) && (res.data > 0)) {    
            this.error.jumlah_soal = "Jumlah Soal Melebihi Batas. ";
        } else if(res.data === 0) {
            this.error.jumlah_soal = "Level dan Kategori tidak ada di Bank Soal.";
        } else {
        // window.console.log(res.data);
      
      
            this.Api.post("/schedules", this.schedules).then((response) => {
              this.$router.push({ name: "master_schedules" });
            });
        
        }

      });

      // this.errors = [];

      e.preventDefault();
    },
    
    inputMulai() {
      this.schedules.durasi = "";
      this.schedules.end = "";
    },
    inputDurasi(how) {
      // var timevalue = moment(this.schedules.start, 'HH:mm:ss');
      // var datevalue = moment(this.schedules.start, 'YYYY-MM-DD');
      // var time = moment(datevalue + ', ' + timevalue);

      // var newTime = moment(time).add('m', how);
      // // console.log(newTime.format("dddd, MMMM Do YYYY, h:mm:ss a"));
      
      // this.schedules.end = newTime.format("YYYY-MM-DD HH:mm:ss");

      // var startdate = this.schedules.start; 
      var end = moment(this.schedules.start).add(how, 'minutes');
      this.schedules.end = end.format('YYYY-MM-DD HH:mm:ss');
    }
  },
};
</script>
