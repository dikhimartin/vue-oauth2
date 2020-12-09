<template>
<div v-if="user.role === 'user'">
  <box header="true">
    <template v-slot:btn-top-left>
      <button @click="toggleWeekends" class="btn btn-default btn-sm">
        Weekend
      </button>
    </template>
    <full-calendar :options="calendarOptions" />
  </box>
</div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          // left: "prev,next today",
          // center: "title",
          right: 'prev,next,today,dayGridMonth,dayGridWeek,dayGridDay',
          left: "title",
        },
        eventClick: this.onDateClicked,
        events: [],
        eventColor: "black",
        weekends: false,
        displayEventEnd: true,
        eventTimeFormat: {
          // like '14:30:00'
          hour: "2-digit",
          minute: "2-digit",
          //second: "2-digit",
          meridiem: false,
          hour12: false,
        },
        // validRange: function(nowDate){
        //     return {start: nowDate} //to prevent anterior dates
        // },
      },
      user: [],
      user_jadwal: [],
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

    this.Api.get("/schedules_peserta").then((res) => {
      // window.console.log(res.data.schedules)
      this.calendarOptions.events = res.data.schedules;
    });
  },
  methods: {
    toggleWeekends() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
    },
    onDateClicked(args) {
      this.Api.get("/user_schedules/" + args.event.id)
        .then((res) => {
          // window.console.log(res.data.schedules)
          this.user_jadwal = res.data.user_schedules[0];
          // this.user_jadwal.user_id = res.data.user_schedules[0].user_id;

          // window.console.log(this.user_jadwal.schedule_id)

          if (this.user_jadwal == null) {
            alert("Kamu tidak terdaftar pada Ujian ini");
          }

          //window.console.log(args.event.id)
          //window.console.log(args.event.start)

          if (args.event.end < moment(new Date())) {
            alert("Waktu Ujian Sudah Terlewat");
          } else if (args.event.start > moment()) {
            alert("Ujian Belum Dimulai");
          } else if (args.event.id != this.user_jadwal.schedule_id) {
            alert("Kamu tidak terdaftar pada Ujian ini");
          } else if (
            args.event.id == this.user_jadwal.schedule_id &&
            this.user.id == this.user_jadwal.user_id
          ) {
            this.$router
              .replace({ name: "test", params: { id: args.event.id } })
              .catch(() => {});
          }
        })
        .catch(function (error) {});
    },
  },
};
</script>

<style>
.fc-event-future,
.fc-event-today {
  background-color: #10cc55;
  color: black;
}
.fc-event-past {
  color: black;
  background-color: tomato;
}
.fc-event-past:hover {
  color: black;
  background-color: crimson;
}
.fc-event {
  cursor: pointer;
}

/* .fc-daygrid-event-dot {
  display: none;
} */
</style>