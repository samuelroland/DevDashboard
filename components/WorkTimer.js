//Widget Work Timer
DevD.component("work-timer", {
  template:
    /*html*/
    `<div class="p-2 m-1 border-2 border-blue-600 border-solid rounded-lg">
    <widget-header name="Work Timer" version="v0.1"></widget-header>
    <div class="flex">
    <div class="w-full divtop">
      <div class="inline-block">
        <comp-button :disabled="startBtnDisabled" name="Work Timer ON" eventname="start-click" @start-click="workCounter"
          link=""></comp-button>
          <comp-button :disabled="breakBtnDisabled" name="Break Timer ON" eventname="break-click" @break-click="breakCounter"
            link=""></comp-button>
      </div>
      <div>
        <div class="flex justify-end pt-1">
          <span class="mr-2">Work Timer</span>
          <input type="text"
            class="w-16 px-1 bg-blue-100 border border-blue-400 border-solid rounded focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500"
            v-model="currentWorkTimer" disabled>
        </div>
        <div class="flex justify-end pt-1">
          <span class="mr-2">Break Timer</span>
          <input type="text"
            class="w-16 px-1 bg-blue-100 border border-blue-400 border-solid rounded focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500"
            v-model="currentBreakTimer" disabled>
        </div>
      </div>
    
      <div class="">
        <h4 class="text-lg">Total work time: {{ totalWorkTime }}</h4>
        <h4 class="text-lg">Total break time: {{ totalBreakTime }}</h4>
        <div class="pt-1">
        <comp-button name="New part" eventname="newpart-click" @newpart-click="newPart" link=""></comp-button>
        </div>
      </div>
    </div>
    <div>
      <div class="pl-3 w-80">
        <div class="w-full h-full p-2 break-words border-2 border-blue-400 rounded word">
          <h6 class="text-xl">Saved parts</h6>
          <div>
            <ol>
              <li class="pl-1 cursor-pointer hover:bg-yellow-400" v-for="part in parts">{{ part.number + ". " + this.timeInHourMinutes(part.start) + "-" + this.timeInHourMinutes(part.end) + " - " + diffTimeInHours(part.start, part.end)}} 
              <img src="icons/checkbox.svg" class="inline w-4" v-if="part.validated" />
              <img src="icons/checked.png" class="inline w-4" v-if="!part.validated" />
              </li>
            </ol>
          </div>
          <div :class="{invisible: selectedPart == null}">
          <hr class="my-1 border border-blue-400">
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
          <input class="w-10 px-1" type="text" name="duration" step="0.5" max="10" min="0.5" value="4.5" disabled v-model="selectedPartConvertedTimeIfNotNull"><br>
          <textarea class="w-full p-1 mt-1" placeholder="Describe what was the work in this part...">{{ selectedPartTextIfNotNull }}</textarea>
          <comp-button name="Save here" eventname="" link=" ">Save here</comp-button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>`,
  data() {
    return {
      //Timers for work and break times
      currentWorkTimer: 0,
      currentBreakTimer: 0,
      selectedPart: null,
      currentPartConvertedTime: 0,
      currentPartType: 0,
      startBtnDisabled: false,
      breakBtnDisabled: true,
      parts: [
        {
          number: 1,
          validated: true,
          text: "test texte",
          start: new Date("2020-03-04 12:03:02"),
          end: new Date("2020-03-04 12:30:02"),
          humanTime: "156 min",
        },
        {
          number: 1,
          validated: false,
          text: "test texte",
          start: new Date("2020-03-04 08:32:02"),
          end: new Date("2020-03-04 12:20:02"),
          humanTime: "156 min",
        },
        {
          number: 1,
          validated: true,
          text: "test texte",
          start: new Date("2020-03-04 08:08:02"),
          end: new Date("2020-03-04 14:25:02"),
          humanTime: "156 min",
        },
      ],
    };
  },
  methods: {
    workCounter() {
      setInterval(() => {
        this.currentWorkTime++;
      }, 1000);
    },
    breakCounter() {
      setInterval(() => {
        this.currentBreakTime++;
      }, 1000);
    },
    fulldate(date) {
      return (
        date.getDate() +
        "." +
        (date.getUTCMonth() + 1) +
        "." +
        date.getFullYear()
      );
    },
    timeInHourMinutes(date) {
      nbHours = date.getHours();
      if (nbHours < 10) {
        nbHours = "0" + nbHours;
      }
      nbMinutes = date.getMinutes();
      if (nbMinutes < 10) {
        nbMinutes = "0" + nbMinutes;
      }
      return nbHours + ":" + nbMinutes;
    },
    diffTimeInHours(start, end, humanValue = false) {
      diff = end - start;
      console.log(start);
      console.log(end);
      console.log(diff);
      diffInDate = new Date(diff);
      nbHours =
        diffInDate.getHours() - 1 + "." + diffInDate.getMinutes().toFixed(0);
      if (humanValue == true) {
        nbHours += "h";
      }
      return nbHours;
    },
  },
  computed: {
    selectedPartConvertedTimeIfNotNull() {
      if (this.currentPartConvertedTime != null) {
        return this.currentPartConvertedTime.time; //the time rounded to the half point under.
      }
      return 0;
    },
    totalWorkTime() {
      total = 0;
      Array.prototype.forEach.call(this.parts, function (part) {
        //set vars
        start = part.start;
        end = part.end;
        humanValue = true;

        //copy paste temp
        diff = end - start;
        console.log(start);
        console.log(end);
        console.log(diff);
        diffInDate = new Date(diff);
        nbHours =
          diffInDate.getHours() - 1 + "." + diffInDate.getMinutes().toFixed(0);
        total += parseFloat(nbHours);
        console.log(total);
      });
      if (humanValue == true) {
        total += "h";
      }
      return total; //calculate the total work time with all parts
    },
    totalBreakTime() {
      return "20min"; //calculate the total break time with all parts
    },
    selectedPartTextIfNotNull() {
      if (this.selectedPart != null) {
        return this.selectedPart.text;
      }
      return "";
    },
  },
});
