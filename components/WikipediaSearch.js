//Widget Wikipedia Search
DevD.component("wikipedia-search", {
  template:
    /*html*/
    `<div class="border-solid border-2 border-blue-600 m-1 p-2 rounded-lg">
    <widget-header name="Wikipedia Search" version="v0.2"></widget-header>
      <div class="max-w-xl min-h-">
          <p><input type="text" placeholder="Pick a word" v-model="word" class="rounded px-1 bg-blue-100 border-solid border border-blue-400 focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500">
              <comp-button :disabled="isDisabled" name="Search it!" eventname="search-onclick" link=""></comp-button>
              <comp-button :disabled="isDisabled" :name="GoOnPage" eventname="" :link="computedLink"></comp-button>
          </p>
          <p class="pt-2 invisible">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi dolore eius excepturi optio quo
              sint voluptates. Architecto asperiores cupiditate dolore dolores esse facilis ipsa odit quam quibusdam!
          </p>
        </div>
    </div>`,
  data() {
    return {
      name: "Wikipedia Search",
      word: "",
    };
  },
  computed: {
    GoOnPage() {
      if (this.word !== "") {
        return "Go on the page " + this.word;
      }
      return "Go on the page ...";
    },
    isDisabled() {
      return this.word == "";
    },
    computedLink() {
      if (this.word == "") {
        return "";
      }
      return "https://fr.wikipedia.org/wiki/" + this.word;
    },
  },
  methods: {
    search() {},
  },
});
