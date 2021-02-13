//Widget Strings Stats
DevD.component("strings-stats", {
  template:
    /*html*/
    `<div class="p-2 m-1 border-2 border-blue-600 border-solid rounded-lg">
    <widget-header name="Strings stats" version="v0.2"></widget-header>
    <textarea class="w-full p-1 border-2 border-blue-200 border-solid rounded-sm focus:border-blue-800" id="txtarea" rows="5"
              placeholder="Paste your string here..."
              v-model="content" v-on:input="calculateAllStats">
    </textarea>
    <ul>
        <li>{{ totalChars }} chars</li>
        <li>{{ totalWords }} words (' ' as separator)</li>
        <li>{{ totalWordsAdvanced }} words advanced (separators: {{ separatorsListIfTotalWordsAdvanced }})</li>
        <li>Most used word is: X</li>
        <li class="pb-1"><input class="px-1 ml-0 mr-1 bg-green-200 border border-green-500 border-solid rounded-lg disabled:text-white hover:bg-green-300" type="number" placeholder="Set a max" v-model="maxCharsToCheck" v-on:input="calculateAllStats"> chars at max.
            <span class="txtgreen">{{ maxCharsToCheckInfo }}</span></li>
        <li class="pb-1"><input class="px-1 ml-0 mr-1 bg-green-200 border border-green-500 border-solid rounded-lg disabled:text-white hover:bg-green-300" type="text" placeholder="search a substring" v-model="substringToSearch"> found
            {{ nbTimesSubstringFound }} times
        </li>
        <li class="pb-1"><input type="checkbox"> <label>Words? </label><input class="px-1 ml-0 mr-1 bg-green-200 border border-green-500 border-solid rounded-lg disabled:text-white hover:bg-green-300" type="text" placeholder="Match a Regex">
            matched X
            times
        </li>
    </ul>
</div>`,
  data() {
    return {
      content: "",
      words: [],
      totalChars: 0,
      totalWords: 0,
      totalWordsAdvanced: 0,
      separatorsListIfTotalWordsAdvanced: "",
      mostUsedWord: "",
      maxCharsToCheck: 100,
      maxCharsToCheckInfo: "", //result of the check
      substringToSearch: "",
      nbTimesSubstringFound: 0,
      chkRegexOnWords: true,
      inpRegexOnWords: "",
      nbMatchesForRegex: 0,
      //Css:
      txtCssAddings: "",
      txtCssClasses: "widthmozavailable " + this.txtCssAddings,
    };
  },
  methods: {
    calculateAllStats() {
      text = this.content;
      this.totalChars = text.length;

      //Calculate this.totalWords
      //Thanks to: https://stackoverflow.com/questions/19313541/split-a-string-based-on-multiple-delimiters#answer-19313673
      separators = [" "];
      this.words = text
        .trim()
        .split(new RegExp("[" + separators.join("") + "]", "g"));
      this.words = this.words.filter(function (el) {
        //trim and split with spaces on the text
        return el != ""; //keep item of the array only if not empty string
      });
      this.totalWords = this.words.length;
      //Trim with all non words chars to count advanced words (more separators):
      this.words = text
        .trim()
        .split((e = new RegExp("[-_](?!\\w)|[-_](?<!\\w\\W)|[^\\w-_]"))); //split with "hard" regex to take all non words chars except - and _ if char before and after are words chars.
      console.log(e);
      this.words = this.words.filter(function (el) {
        //filter and remove empty values
        return el != ""; //keep item of the array only if not empty string
      });
      this.totalWordsAdvanced = this.words.length;
      this.separatorsListIfTotalWordsAdvanced =
        "all not words chars, except '_' and '-'";

      //Check that content.length respect this.maxCharsToCheck
      if (this.maxCharsToCheck >= this.content.length) {
        this.maxCharsToCheckInfo = "Respected !";
        this.manageErrorCssOnTextarea(false);
      } else {
        this.maxCharsToCheckInfo = "Exceeded !";
        this.manageErrorCssOnTextarea(true);
      }

      //Count occurrences of a string:
      wordsOccurences = [];
      wordsOccurencesMoreThan2 = [];
      Array.prototype.forEach.call(this.words, function (word) {
        if (wordsOccurences[word] == null) {
          wordsOccurences[word] = 1;
        } else {
          wordsOccurences[word]++;
        }
      });
      console.log(this.words);
      console.log(wordsOccurences);
      wordsOccurences = wordsOccurences.sort((a, b) => b - a);
      Array.prototype.forEach.call(wordsOccurences, function (elem) {
        console.log(elem);
        if (elem > 1) {
          wordsOccurencesMoreThan2.push(elem);
          console.log("pushed");
        }
      });

      console.log("wordsOccurences");
      console.log(wordsOccurences);
      console.log(wordsOccurencesMoreThan2);
    },
    //Display or hide error css on text area
    manageErrorCssOnTextarea(display = true) {
      if (display == true) {
        this.txtCssAddings = "inputerror";
      } else {
        this.txtCssAddings = "";
      }
      this.loadTxtCssClasses();
    },
    loadTxtCssClasses() {
      //load the txtCssClasses variable after modification of txtCssAddings
      this.txtCssClasses = "widthmozavailable " + this.txtCssAddings;
    },
    ////Thanks to: https://stackoverflow.com/questions/3365902/search-for-all-instances-of-a-string-inside-a-string#answer-20968478
    //allIndexOf(str, toSearch) { //Get an array of all the position of a substring in a string
    //    if (str == null || toSearch == null) {
    //        return 0
    //    }
    //    indices = [];
    //    for (pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
    //        indices.push(pos);
    //    }
    //    return indices;
    //}
  },
  mounted() {
    this.calculateAllStats();
  },
});
