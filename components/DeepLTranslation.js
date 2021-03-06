//Widget DeepL Translation
DevD.component("deepl-translation", {
  template:
    /*html*/
    `<div class="max-w-xl p-2 m-1 border-2 border-blue-600 border-solid rounded-lg">
    <widget-header name="DeepL Translate" version="v0.1"></widget-header>
        <label for="sltLanguageSource">Source language</label>
        <select id="sltLanguageSource" class="px-1 bg-blue-100 border border-blue-400 border-solid rounded focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500">
            <option value="fr">French</option>
            <option value="en">English</option>
            <option value="en">German</option>
        </select>
        <textarea class="widthmozavailable" cols="50" rows="6" placeholder="Write your text here:"></textarea><p></p>
        <h3 class="nomargin">Result:</h3>
        <label for="sltLanguageDestination">Destination language</label>
        <select id="sltLanguageDestination" class="px-1 bg-blue-100 border border-blue-400 border-solid rounded focus:bg-blue-200 focus:border-2 focus:border-solid focus:border-blue-500">
            <option value="fr">French</option>
            <option value="en">English</option>
            <option value="en">German</option>
        </select>
        <br>
        <div class="thinBlueBorder littlepadding">
        <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi dolore eius excepturi optio quo
            sint voluptates. Architecto asperiores cupiditate dolore dolores esse facilis ipsa odit quam quibusdam!
        </span>
        </div>
    </div>`,
});
