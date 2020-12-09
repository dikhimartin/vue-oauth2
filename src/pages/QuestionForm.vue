<template>
<div v-if="user.role === 'admin'">
  <box
    title="Form Bank Soal"
    footer="true"
    :back="{ name: 'master_questions' }"
  >
    <div class="row">
      <div
        v-for="question in getData($route.params.id)"
        :key="question.id"
        class="col-md-4"
      >
        <form @submit.prevent="updateQuestion">
          <div class="form-group">
            <label>Judul Soal</label>
            <input type="text" class="form-control" v-model="question.title" />
          </div>
          <div class="form-group">
            <label>Tingkatan</label>
            <!-- <select class="form-control" v-model="question.level_name"></select> -->
            <select2 class="form-control" v-model="question.level_id">
              <!-- <option value="">Select Level</option> -->
              <option
                v-for="questionlevel in questionlevels"
                :key="questionlevel.id"
                :value="questionlevel.id"
              >
                {{ questionlevel.name }}
              </option>
            </select2>
          </div>
          <div class="form-group">
            <label>Kategori</label>
            <select2 class="form-control" v-model="question.category_id">
              <option
                v-for="questioncategory in questioncategories"
                :key="questioncategory.id"
                :value="questioncategory.id"
              >
                {{ questioncategory.name }}
              </option>
            </select2>
          </div>
          <div class="form-group">
            <label>Pertanyaan <b style="color: red;">(readme.txt)</b></label>
            <textarea
              rows="4"
              class="form-control"
              v-model="question.pertanyaan"
            ></textarea>
          </div>
           <div class="form-group">
            <label>Jawaban <b style="color: red;">(answer.sh)</b></label>
            <textarea
              rows="4"
              class="form-control"
              v-model="question.jawaban"
            ></textarea>
          </div>
           <div class="form-group">
            <label>Config <b style="color: red;">(exam.conf)</b></label>
            <textarea
              rows="4"
              class="form-control"
              v-model="question.config"
            ></textarea>
          </div>
           <div class="form-group">
             <label>Compiler <b style="color: red;">(run.sh)</b></label>
            <textarea
              rows="4"
              class="form-control"
              v-model="question.compiler"
            ></textarea>
          </div>
          <input type="hidden" v-model="questions.is_convert">
          <button type="submit" class="btn btn-primary">Update Question</button>
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
      questions: [],
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

    this.Api.get("/questions/" + this.$route.params.id).then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.questions = res.data.questions;
      //   window.console.log(this.question[0]);
      //   return this.question.title;
    });

    this.Api.get("/questionlevels").then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.questionlevels = res.data.question_levels;
      //   window.console.log(this.question[0])
    });

    this.Api.get("/questioncategories").then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.questioncategories = res.data.question_categories;
      //   window.console.log(this.question[0])
    });
    // this.onFileChanged
  },
  methods: {
    // onFileChanged(event) {
    //   // window.console.log(event.target.files[0].name);
    //   this.questions[0].image = event.target.files[0].name;
    // },
    updateQuestion() {

      var form = new FormData()
      form.append('title', this.questions[0].title)
      form.append('level_id', this.questions[0].level_id)
      form.append('category_id', this.questions[0].category_id)
      form.append('pertanyaan', this.questions[0].pertanyaan)
      form.append('jawaban', this.questions[0].jawaban)
      form.append('config', this.questions[0].config)
      form.append('compiler', this.questions[0].compiler)
      form.append('is_convert', this.questions[0].is_convert = 0)
      form.append('_method', 'PUT')

      // window.console.log(this.$refs.inputan1[0].files[0])
  
      this.Api.post("/questions/" + this.$route.params.id, form).then((res) => {
        // window.console.log(res.data.schedules)
        //window.console.log(this.$route.params.id)
        //this.questions = res.data.questions;
        // window.console.log(this.questions[0])
        this.$router.push({ name: "master_questions" });
      });
      // e.preventDefault();
    },
    getData(id) {
      let data = this.questions;
      return data.filter((event) => {
        return event.id == id;
      });
    },
  },
};
</script>
