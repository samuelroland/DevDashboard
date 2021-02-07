//Widget Work Timer
DevD.component("work-timer", {
  template:
    /*html*/
    `<div class="w-80 border-solid border-2 border-blue-600 m-1 p-2 rounded-lg">
    <widget-header name="Work Timer" version="v0.1"></widget-header>
    <div class="flex w-full">
      <div class="flex-1">
        <comp-button :disabled="startBtnDisabled" name="Start" eventname="start-click" @start-click="startCounter"
          link=""></comp-button><br>
        <div class="py-1">
          <comp-button :disabled="breakBtnDisabled" name="Pause" eventname="break-click" @break-click="breakCounter"
            link=""></comp-button>
        </div>
      </div>
      <div>
        <div class="pt-1 justify-end flex">
          <span class="mr-2">Work Timer</span>
          <input type="text"
            class="rounded px-1 bg-blue-100 border-solid border border-blue-400 focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500 w-16"
            v-model="currentWorkTime" disabled>
        </div>
        <div class="pt-1 justify-end flex">
          <span class="mr-2">Break Timer</span>
          <input type="text"
            class="rounded px-1 bg-blue-100 border-solid border border-blue-400 focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500 w-16"
            v-model="currentBreakTime" disabled>
        </div>
      </div>
    </div>
  </div>`,
  data() {
    return {
      currentWorkTime: 0,
      currentBreakTime: 0,
      totalTime: 0,
      totalBreakTime: 0,
      startBtnDisabled: false,
      breakBtnDisabled: true,
    };
  },
  methods: {
    startCounter() {},
  },
});
