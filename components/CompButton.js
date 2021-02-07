DevD.component("comp-button", {
  template:
    /*html*/
    `<button class="disabled:text-white hover:bg-green-300 ml-0 mr-1 px-1 border-solid border border-green-500 rounded-lg bg-green-200" @click="launchClickActions" :disabled="isDisabled">{{ name }}</button>`,
  props: {
    name: {
      required: true,
      type: String,
    },
    link: {
      type: String,
      required: true,
    },
    eventname: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: function () {
        return false;
      },
    },
  },
  methods: {
    launchClickActions() {
      console.log(this.link);
      if (this.link == "") {
        this.$emit(this.eventname);
      } else {
        window.open(this.link, "_blank");
      }
    },
  },
});
