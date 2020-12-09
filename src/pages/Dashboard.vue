<template>
  <div>
    <div v-if="this.user.role != 'admin'" class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">Selamat datang!</h3>
      </div>
      <div class="box-body">
        <h1>{{ env.app_name }}</h1>

        <router-link
          :to="{ name: 'exam_schedule' }"
          class="btn btn-lg btn-success"
        >
          <i class="fa fa-chevron-right"></i> Lihat jadwal
        </router-link>
      </div>
    </div>
    <div v-if="this.user.role === 'admin'">
      <!-- <div class="row">
        <div class="col-lg-3 col-xs-6" v-for="level in questionlevels" :key="level.id">
          <h3>{{ level.name }}</h3>
          <div class="small-box bg-aqua" v-for="category in questioncategories" :key="category.id">
            <div class="inner">
              <h3>BERAPA?</h3>

              <p>{{ category.name }}</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
      </div> -->
      <h3 style="text-align:center;">Statistik Bank Soal</h3>
      <div class="row">
        <div class="col-lg-4 col-xs-12" v-for="question in questions" :key="question.id">
          <h3 style="border-bottom: 5px solid #ccc; text-align:center; padding:5px;"><b>{{ question.level_name }}</b></h3>
          <div class="small-box bg-aqua" v-for="category in question.category" :key="category.name">
            <div class="inner">
              <h3>{{ category.count }} Soal</h3>

              <h4>{{ category.name }}</h4>
            </div>
            <div class="icon">
              <i class="fa fa-question-circle"></i>
            </div>
            <!-- <a href="#" class="small-box-footer"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      //user_image: "",
      //role: "user",
      questions: [],
      questionlevels: [],
      questioncategories: [],
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
      if (this.user.status != 1) {
        this.Api.logout();
      }
    });

    this.Api.get("/questions_count").then((res) => {
      // window.console.log(res.data.schedules)
      this.questions = res.data;
      // window.console.log(this.questions[0].category)

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

  },
};
</script>