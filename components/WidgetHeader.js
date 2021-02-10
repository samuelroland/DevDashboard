DevD.component("widget-header", {
  template:
    /*html*/
    `<div class="flex w-full" @mouseover="widgetMouseOver = true" @mouseout="widgetMouseOver = false">
        <h2 class="flex-1 py-1 text-3xl">{{ name }}</h2>
        <span v-if="widgetMouseOver" class="flex items-end py-1 text-gray-400">{{ version }}</span>
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
