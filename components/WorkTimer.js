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
          <comp-button :disabled="breakBtnDisabled" name="Break Timer ON" eventname="start-click" @start-click="breakCounter"
            link=""></comp-button>
      </div>
      <div>
        <div class="flex justify-end pt-1">
          <span class="mr-2">Work Timer</span>
          <input type="text"
            class="w-16 px-1 border border-blue-400 border-solid rounded focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500"
            :class="{'text-white': workCounterInRun && blueTicTacActive, 'bg-blue-300':workCounterInRun && blueTicTacActive, 'bg-blue-100': !blueTicTacActive}"
            v-model="currentWorkTimerInHoursMinutes" disabled>
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
        <comp-button name="New part" eventname="newpart-click" @newpart-click="saveNewPartFromTimers" link=""></comp-button>
        </div>
      </div>
    </div>
    <div>
      <div class="pl-3 w-80">
        <div class="w-full h-full p-2 break-words border-2 border-blue-400 rounded word">
          <h6 class="text-xl">Saved parts</h6>
          <div>
          <p v-if="parts.length == 0" class="italic text-gray-400 font-normal">Aucune partie...</p>
            <ol>
              <li class="pl-1 cursor-pointer hover:bg-yellow-400" v-for="part in parts" :class="{'bg-yellow-300': thePartIsSelected(part.id)}" @click="loadPart(part.id)">{{ part.id + ". " + this.timeInHourMinutes(part.start) + "-" + this.timeInHourMinutes(part.end) + " - " + diffTimeInHours(part.start, part.end, true)}} 
              <img src="icons/checkbox.svg" class="inline w-4" v-if="part.validated" />
              <img src="icons/checked.png" class="inline w-4" v-if="!part.validated" />
              </li>
            </ol>
          </div>
          
        </div>
      </div>
    </div>
    </div>
    <div :class="{invisible: selectedPart == null}">
          <hr class="my-1 border border-blue-400">
          <div class="text-right italic">Part {{ selectedPartIdIfNotNull }}</div>
          Type: <select name="activitytype" v-model="newPartForm.type">
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
          Converted time:
          <input class="w-10 px-1" type="text" name="duration" step="0.5" max="10" min="0.5" value="4.5" v-model="newPartForm.roundedTimeInHours"><br>
          <textarea rows="3" v-model="newPartForm.text" class="w-full p-1 mt-1" placeholder="Describe what was the work in this part...">{{ selectedPartTextIfNotNull }}</textarea>
          <p class="text-sm text-right text-gray-400 font-normal">Automatically saved...</p>
          </div>
  </div>`,
  data() {
    return {
      //Timers for work and break times
      workCounterInRun: false, //if the timer of work time is in run or not
      blueTicTacActive: false,
      diffTimeBetweenStartAndNow: null,
      currentBreakTimer: 0,
      selectedPart: null,
      currentCount: null, //part currently counted by timers
      startBtnDisabled: false,
      breakBtnDisabled: false,
      newPartForm: {
        id: null,
        validated: false,
        text: "",
        type: 4,
        start: new Date("2020-03-04 12:03:02"),
        end: new Date("2020-03-04 12:30:02"),
        roundedTimeInHours: 0,
      },
      parts: [
        {
          id: 1,
          validated: true,
          text: "partie meeting",
          type: 4,
          start: new Date("2020-03-04 12:03:02"),
          end: new Date("2020-03-04 12:30:02"),
          roundedTimeInHours: 0,
        },
        {
          id: 2,
          validated: false,
          text: "matin productif",
          type: 10,
          start: new Date("2020-03-04 08:32:02"),
          end: new Date("2020-03-04 12:20:02"),
          roundedTimeInHours: 0,
        },
        {
          id: 3,
          validated: true,
          type: 9,
          text: "début de journée remplie",
          start: new Date("2020-03-04 08:08:02"),
          end: new Date("2020-03-04 14:25:02"),
          roundedTimeInHours: 0,
        },
      ],
    };
  },
  methods: {
    workCounter() {
      this.workCounterInRun = true;
      console.log("workcounter");
      setInterval(() => {
        //start interval of reloading set to 10 seconds
        this.diffTimeBetweenStartAndNow = this.diffTimeInHours(
          //compare start date of the current count and now
          this.currentCount.start,
          new Date(),
          false,
          true
        );
      }, 10000);
      //Each second, invert the value of this.blueTicTacActive to change colors (text and background) of the timers when in run
      setInterval(() => {
        this.blueTicTacActive = !this.blueTicTacActive;
        console.log(this.blueTicTacActive);
      }, 1000);
      this.currentCount = this.initPart();
    },
    initPart() {
      return {
        id: this.parts.length + 1,
        validated: false,
        text: "",
        type: 1,
        start: new Date(),
        end: null,
        roundedTimeInHours: 0,
      };
    },
    breakCounter() {
      console.log("breakCounter");
      setInterval(() => {
        this.currentBreakTimer++;
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
      console.log(date);
      console.log("asf");
      if (date != null && date != undefined && date != 0) {
        nbHours = date.getHours();
        if (nbHours < 10) {
          nbHours = "0" + nbHours;
        }
        nbMinutes = date.getMinutes();
        if (nbMinutes < 10) {
          nbMinutes = "0" + nbMinutes;
        }
        return nbHours + ":" + nbMinutes;
      } else {
        return "00:00";
      }
    },
    diffTimeInHours(start, end, humanValue = false, dateType = false) {
      diff = end - start;
      console.log(start);
      console.log(end);
      console.log(diff);
      diffInDate = new Date(diff);

      //removed the 1 hour (strange problem)
      console.log(diffInDate);
      console.log("hey");
      diffInDate.setHours(diffInDate.getHours() - 1);
      console.log(diffInDate);

      if (dateType == true) {
        return diffInDate;
      }
      nbHours = (
        (diffInDate.getHours() * 60 + diffInDate.getMinutes()) /
        60
      ).toFixed(2); //calculate the number of minutes and divide by 60, to find the number of hours
      if (humanValue == true) {
        nbHours += "h";
      }
      return nbHours;
    },
    loadPart(partId) {
      cool = true;
      console.log("loading part");
      if (partId == null) {
        this.selectedPart = null;
      } else {
        Array.prototype.forEach.call(this.parts, function (part) {
          console.log(part.id);
          if (part.id == partId) {
            partFound = part;
            console.log("trouvé ");
            console.log(this.selectedPart);
            cool = false;
          }
        });
      }
      this.selectedPart = partFound;
      this.newPartForm = this.selectedPart;
    },
    thePartIsSelected(givenId) {
      if (this.selectedPart == null) {
        return false;
      }
      return this.selectedPart.id == givenId;
    },
    selectedPartConvertedTimeIfNotNull() {
      if (this.selectedPart != null) {
        diff = this.diffTimeInHours(
          this.selectedPart.start,
          this.selectedPart.end,
          false
        );
        this.newPartForm.roundedTimeInHours = diff;
        return diff;
      }
      return 0;
    },
    saveNewPartFromTimers() {
      if (this.currentCount != null) {
        this.currentCount.end = new Date();
        this.parts.push(this.currentCount);

        this.currentCount = this.initPart();
        this.diffTimeBetweenStartAndNow = 0;
      }
    },
  },
  computed: {
    currentWorkTimerInHoursMinutes() {
      return this.timeInHourMinutes(this.diffTimeBetweenStartAndNow);
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
          diffInDate.getHours() -
          1 +
          "." +
          (diffInDate.getMinutes() / 60).toFixed(0);
        total += parseFloat(nbHours);
        console.log(total);
      });
      total = total.toFixed(2) + "h";
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
    selectedPartTypeIfNotNull() {
      if (this.selectedPart != null) {
        return this.selectedPart.type;
      }
      return "";
    },
    selectedPartIdIfNotNull() {
      if (this.selectedPart != null) {
        return this.selectedPart.id;
      }
      return "";
    },
  },
});
