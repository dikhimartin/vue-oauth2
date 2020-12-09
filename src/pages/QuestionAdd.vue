<template>
<div v-if="user.role === 'admin'">
  <box
    title="Form Bank Soal"
    footer="true"
    :back="{ name: 'master_questions' }"
  >
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="addQuestion" enctype="multipart/form-data">
          <div
            class="form-group has-feedback"
            :class="{ 'has-error': error.title }"
          >
            <label>Judul soal</label>
            <input type="text" class="form-control" v-model="questions.title" />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.title">
              <i class="fa fa-info-circle"></i> {{ error.title }}
            </p>
          </div>
          <div
            class="form-group has-feedback"
            :class="{ 'has-error': error.level_id }"
          >
            <label>Tingkatan</label>
            <!-- <select class="form-control" v-model="question.level_name"></select> -->
            <select2 class="form-control" v-model="questions.level_id">
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
            <select2 class="form-control" v-model="questions.category_id">
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
            :class="{ 'has-error': error.pertanyaan }"
          >
            <label>Pertanyaan <b style="color: red;">(readme.txt)</b></label>
            <textarea
              rows="4"
              class="form-control"
              v-model="questions.pertanyaan"
            ></textarea>
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.pertanyaan">
              <i class="fa fa-info-circle"></i> {{ error.pertanyaan }}
            </p>
          </div>
          <div class="form-group has-feedback"
            :class="{ 'has-error': error.jawaban }"
          >
            <label>Jawaban <b style="color: red;">(answer.sh)</b></label>
           <textarea
              rows="4"
              class="form-control"
              v-model="questions.jawaban"
            ></textarea>
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.jawaban">
              <i class="fa fa-info-circle"></i> {{ error.jawaban }}
            </p>
          </div>
         <div class="form-group has-feedback"
            :class="{ 'has-error': error.config }"
          >
            <label>Config <b style="color: red;">(exam.conf)</b></label>
            <textarea
              rows="4"
              class="form-control"
              v-model="questions.config"
            ></textarea>
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.config">
              <i class="fa fa-info-circle"></i> {{ error.config }}
            </p>
          </div>
           <div class="form-group has-feedback"
            :class="{ 'has-error': error.compiler }"
          >
            <label>Compiler <b style="color: red;">(run.sh)</b></label>
            <textarea
              rows="4"
              class="form-control"
              v-model="questions.compiler"
            ></textarea>
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.compiler">
              <i class="fa fa-info-circle"></i> {{ error.compiler }}
            </p>
          </div>
          <!-- <div class="form-group has-feedback"
            :class="{ 'has-error': error.bobot }"
          >
            <label>Bobot Soal</label>
            <input
              type="number"
              class="form-control"
              v-model="questions.bobot"
            />
            <span class="form-control-feedback"></span>
            <p class="help help-block" v-if="error.bobot">
              <i class="fa fa-info-circle"></i> {{ error.bobot }}
            </p>
          </div> -->
          <input type="hidden" v-model="questions.is_convert">
          <button type="submit" class="btn btn-primary">Add Question</button>
        </form>
      </div>
    </div>
  </box>
</div>
</template>

<script>
export default {
  data() {
    return {
      questions: {
        title: "",
        level_id: "",
        category_id: "",
        pertanyaan: "",
        jawaban: "",
        // bobot: "",
        compiler: "",
        config: "",
        is_convert: 0
      },
      error: {
        title: null,
        level_id: null,
        category_id: null,
        pertanyaan: null,
        jawaban: null,
        // bobot: null,
        compiler: null,
        config: null,
      },
      questionlevels: {},
      questioncategories: {},
      // selectedFile: null,
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
    // onFileChanged(e) {
    //   // window.console.log(event.target.files[0].name);
    //   this.selectedFile = event.target.files[0];
    // },
    // addQuestion() {
    //   return this.Api.post("/questions", this.question).then((res) => {
    //     // window.console.log(res.data.schedules)
    //     //window.console.log(this.$route.params.id)
    //     //this.questions = res.data.questions;
    //     // window.console.log(this.questions[0])

    //     this.questions = res.data.questions;

    //     // this.$router.push({ name: "master_questions" });
    //   });
    // },
    // getData(id) {
    //   let data = this.questions;
    //   return data.filter((event) => {
    //     return event.id == id;
    //   });
    // },
    clearError() {
      this.error.title = null;
      this.error.level_id = null;
      this.error.category_id = null;
      this.error.pertanyaan = null;
      this.error.jawaban = null;
      this.error.bobot = null;
      this.error.compiler = null;
      this.error.config = null;
      
    },
    addQuestion(e) {
      
      this.clearError();
      if (!this.questions.title) {
        this.error.title = "Judul masih kosong";
        return;
      }
      if (!this.questions.level_id) {
        this.error.level_id = "Level masih kosong";
        return;
      }
      if (!this.questions.category_id) {
        this.error.category_id = "Category masih kosong";
        return;
      }
      if (!this.questions.pertanyaan) {
        this.error.pertanyaan = "Pertanyaan masih kosong";
        return;
      }
      if (!this.questions.jawaban) {
        this.error.jawaban = "Jawaban masih kosong";
        return;
      }
      // if (!this.questions.bobot) {
      //   this.error.bobot = "Bobot Soal masih kosong";
      //   return;
      // }
      if (!this.questions.compiler) {
        this.error.compiler = "Compiler masih kosong";
        return;
      }
      if (!this.questions.config) {
        this.error.config = "Config masih kosong";
        return;
      }
      var form = new FormData()
      form.append('title', this.questions.title)
      form.append('level_id', this.questions.level_id)
      form.append('category_id', this.questions.category_id)
      form.append('pertanyaan', this.questions.pertanyaan)
      form.append('jawaban', this.questions.jawaban)
      // form.append('bobot', this.questions.bobot)
      form.append('compiler', this.questions.compiler)
      form.append('config', this.questions.config)
      form.append('is_convert', this.questions.is_convert)

      // window.console.log(this.$refs.inputan1.files[0])
      
      this.Api.post("/questions", form).then((response) => {
        this.$router.push({ name: "master_questions" });
      });

      // this.errors = [];

      e.preventDefault();
    },
  },
};
</script>
