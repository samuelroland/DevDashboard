//Widget GitHub Today
DevD.component("github-today", {
  template:
    /*html*/
    `<div class="p-2 m-1 border-2 border-blue-600 border-solid rounded-lg">
    <widget-header name="GitHub Today" version="v0.1"></widget-header>
        <!--<div>{{ dateOfToday }}</div>-->
asdfasdfasdfsafasfdasfdasdfsadfasdfasdfasdfsafd
</div>`,
  data() {
    return {
      dateOfToday: "date of today",
      nbOfCommits: null,
      reposContributed: null,
    };
  },
  mounted() {
    timestamp = new Date();
    this.dateOfToday =
      timestamp.getDay() +
      "-" +
      (timestamp.getUTCMonth() + 1) +
      "-" +
      timestamp.getFullYear();
  },
});
