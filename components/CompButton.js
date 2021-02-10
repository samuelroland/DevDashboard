DevD.component("comp-button", {
  template:
    /*html*/
    `<button class="px-1 ml-0 mr-1 bg-green-200 border border-green-500 border-solid rounded-lg disabled:text-white hover:bg-green-300" @click="launchClickActions" :disabled="isDisabled">{{ name }}</button>`,
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
