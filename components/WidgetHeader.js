DevD.component("widget-header", {
  template:
    /*html*/
    `<div class="flex w-full" @mouseover="widgetMouseOver = true" @mouseout="widgetMouseOver = false">
        <h2 class="text-3xl py-1 flex-1">{{ name }}</h2>
        <span v-if="widgetMouseOver" class="items-end py-1 flex text-gray-400">{{ version }}</span>
      </div>`,
  props: {
    name: {
      required: true,
      type: String,
    },
    version: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      widgetMouseOver: false,
    };
  },
});
