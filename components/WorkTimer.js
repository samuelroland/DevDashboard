//Widget Work Timer
DevD.component("work-timer", {
  template:
    /*html*/
    `<div class="w- border-solid border-2 border-blue-600 m-1 p-2 rounded-lg">
    <widget-header name="Work Timer" version="v0.1"></widget-header>
    <div class="divtop flex w-full">
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
    <div class="divbottom flex w-full pt-3">
      <div class="flex-1">
        <h4 class="text-lg">Total work time: {{ totalTime }}</h4>
        <h4 class="text-lg">Total break time: {{ totalTime }}</h4>
        <input type="text" placeholder="Done part name"
          class="rounded px-1 bg-blue-100 border-solid border border-blue-400 focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500">
        <comp-button name="New part" eventname="newpart-click" @newpart-click="newPart" link=""></comp-button>
      </div>
      <div class="w-80 pl-3">
        <div class="break-words word border border-blue-200 w-full px-2">
          <h6 class="text-xl">Saved parts</h6>
          <div>
            <ol>
              <li class="hover:bg-yellow-400 px-1" v-for="part in parts">{{ part.number + ". " + part.name + " - " + part.humanTime}}</li>
            </ol>
          </div>
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
      parts: [
        { number: 2, name: "partie cool", humanTime: "3 min" },
        { number: 2, name: "partie cool", humanTime: "3 min" },
        { number: 2, name: "partie cool", humanTime: "3 min" },
      ],
    };
  },
  methods: {
    startCounter() {},
  },
});
