<template>
<div v-if="user_jadwal.schedule_id == this.$route.params.id">
  <box
    footer="true"
    header="true"
    title="Selamat Mengerjakan"
    :back="{ name: 'exam_schedule' }"
  >
    <div>
      <h2 style="float: right; font-weight: bold">
        <div ref="countdown"></div>
      </h2>
      <!-- <Countdown :deadline="event.end"></Countdown> -->
    </div>

    <ul>
      <li>Login : <code>exam</code></li>
      <li>Password : <code>exam</code></li>
      <li>User : <code>test</code></li>
    </ul>

    <h4 v-for="event in getData($route.params.id)" :key="event.id" style="float:right;">
     Waktu Ujian : <b>{{ moment(event.start).format("HH:mm") }} -
      {{ moment(event.end).format("HH:mm") }}</b>
    </h4>

    <template v-slot:footer>
      <img
        src="@assets/img/terminal.gif"
        alt="exam"
        v-if="!frame_url"
        class="wait-image"
      />
      <iframe
        v-if="frame_url"
        :src="frame_url"
        style="height: 500px; width: 100%"
        title="Iframe Example"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </template>
  </box>
</div>
</template>

<script>
// import Countdown from "vuejs-countdown";
import "jquery-countdown";

export default {
  //   components: { Countdown },
  // props: {
  //   deadline: {
  //     type: String,
  //   },
  // },
  data() {
    return {
      frame_url: this.env.exam_frame_url,
      event: {
        end: null,
      },
      events: [],
      user: [],
      user_jadwal: {
        schedule_id: null
      }
    };
  },

  mounted() {
    this.Api.get("/logininfo").then((res) => {
      // window.console.log(res.data.schedules)
      this.user = res.data.user;
      //window.console.log(this.user.role)
      if (this.user.status != 1) {
        // this.$router.go(0);
        this.Api.logout();
      }
    });

    this.Api.get("/user_schedules/" + this.$route.params.id).then((res) => {
          // window.console.log(res.data.schedules)
          this.user_jadwal.schedule_id = res.data.user_schedules[0].schedule_id;
          // this.user_jadwal.user_id = res.data.user_schedules[0].user_id;
    });

    return this.Api.get("/schedules/" + this.$route.params.id).then((res) => {
      // window.console.log(res.data.schedules)
      //window.console.log(this.$route.params.id)
      this.events = res.data.schedules;

      //    var data_detail = this.getData(this.$route.params.id)

      //window.console.log(this.events[0].end)

      //   if(this.events[0].end < moment(new Date())) {
      //        return this.$router.replace({name: 'exam_schedule'})
      //   }
      // this.event.end = res.data.schedules[0].end

      $(this.$refs.countdown).countdown(res.data.schedules[0].end, (event) => {
        var now = event.strftime("%H:%M:%S");
        $(this.$refs.countdown).html(event.strftime("%H:%M:%S"));
        if (now == "00:00:00") {
          this.$router.push({ name: "exam_schedule" }).catch(()=>{});
        }
      });

      // var count = moment(this.events[0].end);
      // window.console.log(count)

      //   if(count < moment()) {
      //       this.$router.replace({name: 'exam_schedule', force: true})
      //   }
    });
  },

  watch: {
    //   'event.end':function(now){
    //       if(new Date() - now < 1){
    //           this.$router.replace({name: 'exam_schedule', force: true})
    //       }
    //   }
  },

  methods: {
    getData(id) {
      let data = this.events;
      return data.filter((event) => {
        return event.id == id;
      });
    },
  },
};
</script>

<style>
.wait-image {
  display: block;
  width: 100%;
}
</style>
