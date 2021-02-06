//DevDashboard app
const DevDConst = {
  data() {
    return {
      appDescription:
      appVersion: "0.2",
      appVersionDate: "01.01.2021",
        "A dashboard for developers centralizing and customizing small tools complementary to development.",
      authorFullname: "Samuel Roland",
      authorProfileLink: "https://github.com/samuelroland",
    };
  },
};

const DevD = Vue.createApp(DevDConst);
