<template>
<div v-if="user.role === 'admin'">
  <box
    title="Form Bank Soal"
    footer="true"
    :back="{ name: 'master_questions' }"
  >
    <router-link
      class="btn btn-primary"
      :to="{ name: 'question_form', params: { id: this.$route.params.id } }"
      ><span class="fa fa-pencil"></span>&nbsp;Edit</router-link
    > <button class="btn btn-danger" href="javascript:;" @click="deleteQuestion(questions[0].id)"><span class="fa fa-trash"></span> Delete</button>
    <table
      v-for="question in getData($route.params.id)"
      :key="question.id"
      id="w0"
      class="table" style="width:100%;"
    >
      <h3>{{ question.title }}</h3>
      <tr>
        <th>ID</th>
        <td>: {{ question.id }}</td>
      </tr>
      <tr>
        <th>Title</th>
        <td>: {{ question.title }}</td>
      </tr>
      <tr>
        <th>Tingkatan</th>
        <td>: {{ question.level_name }}</td>
      </tr>
      <tr>
        <th>Kategori</th>
        <td>: {{ question.category_name }}</td>
      </tr>
      <!-- <tr>
        <th>Bobot Soal</th>
        <td>: {{ question.bobot }}</td>
      </tr> -->
      <tr>
        <th>Pertanyaan <b style="color: red;">(readme.txt)</b></th>
        <td>: {{ question.pertanyaan }}</td>
      </tr>
      <tr>
        <th>Jawaban <b style="color: red;">(answer.sh)</b></th>
        <td>: {{ question.jawaban }}</td>
      </tr>
      <tr>
        <th>Compiler <b style="color: red;">(run.sh)</b></th>
        <td>: {{ question.compiler }}</td>
      </tr>
      <tr>
        <th>Config <b style="color: red;">(exam.conf)</b></th>
        <td>: {{ question.config }}</td>
      </tr>
      <tr>
        <th>Is Convert</th>
        <td>: {{ question.is_convert }}</td>
      </tr>
      <tr>
        <th>Created At</th>
        <td>: {{ question.created_at }}</td>
      </tr>
      <tr>
        <th>Updated At</th>
        <td>: {{ question.updated_at }}</td>
      </tr>
    </table>
  </box>
</div>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      user: [],
    };
  },

  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });
    return this.Api.get("/questions/" + this.$route.params.id).then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.questions = res.data.questions;
      // window.console.log(this.questions[0])
    });
  },

  methods: {
    getData(id) {
      let data = this.questions;
      return data.filter((question) => {
        return question.id == id;
      });
    },
    deleteQuestion(id) {
      if(confirm("Do you really want to delete?")){
      this.Api.delete("/questions/" + this.$route.params.id)
        .then((response) => {
          let i = this.questions.map((item) => item.id).indexOf(id); // find index of your object
          this.questions.splice(i, 1);
          this.$router.push({ name: "master_questions" });
        });
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