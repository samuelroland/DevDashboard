//Widget Repos Info
DevD.component("repos-info", {
  template:
    /*html*/
    `<div class="max-w-2xl h-min border-solid border-2 border-blue-600 m-1 p-2 rounded-lg">
    <widget-header name="Repos info" version="v0.2"></widget-header>
    <input class="rounded px-1 bg-blue-100 border-solid border border-blue-400 focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500" type="text" placeholder="author/repos" v-model="reposId" v-on:input="isReposIdValid">
    
    <comp-button name="Search" eventname="search-click" @search-click="loadInformation" link="" :disabled="isReposIdValidState"></comp-button>
    <comp-button name="Go to Repos" eventname="gotorepos-click" @gotorepos-click="goToReposOnGithub" link="" :disabled="isReposIdValidState"></comp-button>
    <comp-button name="Go to Owner" eventname="gotoowner-click" @gotoowner-click="goToOwnerOnGithub" link="" :disabled="isReposIdValidState"></comp-button>
    <div class="flexdiv" :class="{ invisible: !loadHasStarted }">
        <div class="flex-1" >
            <div class="italic">{{ description }}</div>
            <span>Stars: {{ nbStars }}</span>
            <span> | Commits: {{ nbCommits }}</span>
            <span v-if="releaseFound"> | {{ lastReleaseName }}</span>
        </div>
        <hr class="bg-blue-800 leading-4 border-blue-800 border-solid my-2">
        <div class="flex">
            <div class="py-2">
                <img class="w-16" v-bind:src="imgOwnerSrc" v-if="isLoaded"
                     alt="image of the repos owner">
            </div>
            <div class="px-2">
                <div class="text-lg">{{ ownerFullname }} - {{ ownerUsername }}</div>
                <div>Bio: <em>{{ ownerBio }}</em></div>
            </div>
        </div>
    </div>
    </div>`,
  data() {
    return {
      isLoaded: false,
      loadHasStarted: false,
      reposId: "samuelroland/KanFF",
      isReposIdValidState: false,
      description: "",
      nbStars: 0,
      nbCommits: 0,
      releaseFound: false,
      lastReleaseName: "",
      imgOwnerSrc: "",
      ownerFullname: "",
      ownerUsername: "",
      ownerBio: "",
    };
  },
  methods: {
    async loadInformation() {
      this.loadHasStarted = true;
      httpAddedInformation = {
        headers: {
          Authorization: "token " + githubApiToken2,
        },
      };
      url1 = "https://api.github.com/repos/" + this.reposId;
      await fetch(url1, httpAddedInformation) //basic information on the repos
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          data = JSON.parse(data);
          console.log(data);
          this.nbStars = data.stargazers_count;
          this.ownerUsername = data.owner.login;
          this.description = data.description;
          this.imgOwnerSrc = data.owner.avatar_url;
        });

      url2 = "https://api.github.com/repos/" + this.reposId + "/releases";
      await fetch(url2, httpAddedInformation) //information about the release
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          data = JSON.parse(data);
          console.log(data);
          if (data[0] != null) {
            lastReleaseDate = new Date(data[0].published_at);
            lastReleaseDate = dateformat(lastReleaseDate, "d.m.Y");
            this.lastReleaseName = data[0].tag_name + " le " + lastReleaseDate;
            this.releaseFound = true;
          } else {
            this.releaseFound = false;
          }
        });

      url3 =
        "https://api.github.com/users/" +
        this.reposId.substr(0, this.reposId.indexOf("/"));
      await fetch(url3, httpAddedInformation) //information about the release
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          data = JSON.parse(data);
          console.log(data);
          this.ownerBio = data.bio;
          this.ownerFullname = data.name;
        });

      this.isLoaded = true;
    },
    goToReposOnGithub() {
      window.open("https://github.com/" + this.reposId, "_blank");
    },
    goToOwnerOnGithub() {
      window.open(
        "https://github.com/" +
          this.reposId.substr(0, this.reposId.indexOf("/")),
        "_blank"
      );
    },
    isReposIdValid() {
      text = this.reposId;
      regex = "^[A-z0-9-]{1,}\\/[A-z0-9_\\-.]{1,}$";
      console.log(regex);
      console.log(text);
      tester = new RegExp(regex);
      console.log(tester);
      console.log(regex);
      console.log(text);
      this.isReposIdValidState = !tester.test(text);
    },
  },
});

function dateformat(date, format) {
  format = format.replace("Y", date.getFullYear());
  format = format.replace("m", date.getMonth() + 1);
  format = format.replace("d", date.getDate());
  return format;
}
