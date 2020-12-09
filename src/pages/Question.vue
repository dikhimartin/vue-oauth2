<template>
  <div v-if="user.role === 'admin'">
    <div>
      <router-link class="btn btn-success" :to="{ name: 'question_add' }"
        ><span class="fa fa-plus"></span> Add Bank Soal</router-link
      >
      <br />
      <br />
      <datatable :config="config" @click="onRowClick" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        title: "Bank Soal",
        columns: [
          {
            title: "Judul",
            data: "title",
          },
          {
            title: "Tingkatan",
            data: "level_name",
          },
          {
            title: "Kategori",
            data: "category_name",
          },
          // {
          //   title: "Bobot Soal",
          //   data: "bobot",
          // },
          {
            title: "Status",
            data: "is_convert",
            render: function(data, type, row){
                if ( row.is_convert === 1) {
                  return '<span class="label label-success">CONVERTED</span>';
                } else if(row.is_convert === 0) {
                  return '<span class="label label-danger">UNCONVERTED</span>';
                }
                // return moment(data).format("dddd, D MMMM YYYY - HH:mm");
            },
          },
        ],
        data: [],
      },
      user: [],
    };
  },
  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
    });

    return this.Api.get("/questions").then((res) => {
      // window.console.log(res.data.schedules)
      this.config.data = res.data.questions;
    });
  },
  methods: {
    onRowClick(row) {
      // window.console.log(row[0])
      // window.console.log(this.config.data[row[0]].id)
      this.$router.push({
        name: "question_detail",
        params: { id: this.config.data[row[0]].id },
      });
    },
  },
};
</script>
