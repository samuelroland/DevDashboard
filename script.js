//DevDashboard app
const DevDConst = {
  data() {
    return {
      appDescription:
        "A dashboard for developers centralizing and customizing small tools complementary to development.",
      appVersion: "v0.3",
      appVersionDate: "06.02.2021",
      authorFullname: "Samuel Roland",
      authorProfileLink: "https://github.com/samuelroland",
    };
  },
};

const DevD = Vue.createApp(DevDConst);
