//Widget Work Timer
DevD.component("work-timer", {
  template:
    /*html*/
    `<div class="border-solid border-2 border-blue-600 m-1 p-2 rounded-lg">
    <widget-header name="Work Timer" version="v0.1"></widget-header>
    <div class="flex">
    <div class="divtop w-full">
      <div class="inline-block">
        <comp-button :disabled="startBtnDisabled" name="Start" eventname="start-click" @start-click="startCounter"
          link=""></comp-button>
          <comp-button :disabled="breakBtnDisabled" name="Pause" eventname="break-click" @break-click="breakCounter"
            link=""></comp-button>
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
    
      <div class="">
        <h4 class="text-lg">Total work time: {{ totalTime }}</h4>
        <h4 class="text-lg">Total break time: {{ totalTime }}</h4>
        <input type="text" placeholder="Done part name"
          class="rounded px-1 bg-blue-100 border-solid border border-blue-400 focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500">
        <br>
        <div class="pt-1">
        <comp-button name="New part" eventname="newpart-click" @newpart-click="newPart" link=""></comp-button>
        </div>
      </div>
    </div>
    <div>
      <div class="w-80 pl-3">
        <div class="break-words word border-2 border-blue-400 w-full h-full rounded p-2">
          <h6 class="text-xl">Saved parts</h6>
          <div>
            <ol>
              <li class="hover:bg-yellow-400 pl-1 cursor-pointer" v-for="part in parts">{{ part.number + ". " + this.fulldate(part.start) + " - " + part.humanTime}} <img src="icons/checked.png" class="inline w-4" v-if="part.validated" /></li>
            </ol>
          </div>
          <div>
          <hr class="border border-blue-400 my-1">
          Choose a type: <br>
          <select name="activitytype">
          <option value="1">Maintenance</option>
          <option value="2">Support utilisateurs</option>
          <option value="3">Documentation</option>
          <option value="4">Meeting</option>
          <option value="5">Programmation web</option>
          <option value="6">Programmation logicielle</option>
          <option value="7">Autre</option>
          <option value="8" selected="selected">Acquisition de connaissances</option>
          <option value="9">Intervention</option>
          <option value="10">Recherches</option>
          <option value="11">Absence</option>
          <option value="12">Cours Matu</option>
          <option value="13">Test</option></select>
          <br>Converted time:<br>
          <input class="w-10 px-1" type="text" name="duration" step="0.5" max="10" min="0.5" value="4.5" disabled v-model="currentPartConvertedTime"><br>
          <textarea class="mt-1 w-full p-1" placeholder="Describe what was the work in this part...">{{ currentPartText }}</textarea>
          <comp-button name="Save here" eventname="" link="asdf">Save here</comp-button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>`,
  data() {
    return {
      currentWorkTime: 0,
      currentPartConvertedTime: 0,
      currentPartType: 0,
      currentBreakTime: 0,
      totalTime: 0,
      totalBreakTime: 0,
      startBtnDisabled: false,
      breakBtnDisabled: true,
      parts: [
        {
          number: 1,
          validated: true,
          text: "test texte",
          start: new Date("2020-03-04"),
          end: Date("2020-02-02"),
          humanTime: "156 min",
        },
        {
          number: 1,
          validated: true,
          text: "test texte",
          start: new Date("2020-03-04"),
          end: Date("2020-02-02"),
          humanTime: "156 min",
        },
        {
          number: 1,
          validated: true,
          text: "test texte",
          start: new Date("2020-03-04"),
          end: Date("2020-02-02"),
          humanTime: "156 min",
        },
      ],
    };
  },
  methods: {
    startCounter() {},
    fulldate(date) {
      return (
        date.getDate() +
        "." +
        (date.getUTCMonth() + 1) +
        "." +
        date.getFullYear()
      );
    },
  },
  computed: {
    currentPartConvertedTime() {
      if (true) {
        //if a part is displayed
        return this.currentPartConvertedTime.time; //the time rounded to the half point under.
      }
      return 0;
    },
  },
});
