---
layout: opencs
title: Peppa Pig
permalink: /gamify/gpeppaPigv1-1
---

<div id="gameContainer">
    <div id="promptDropDown" class="promptDropDown" style="z-index: 9999"></div>
    <canvas id='gameCanvas'></canvas>
</div>

<script type="module">
    // Adventure Game assets locations
    import Game from "{{site.baseurl}}/assets/js/GameEnginev1.1/essentials/Game.js";
    import PeppaLevel1 from "{{site.baseurl}}/assets/js/GameEnginev1.1/PeppaLevel1.js";
    import PeppaLevel2 from "{{site.baseurl}}/assets/js/GameEnginev1.1/PeppaLevel2.js";
    import PeppaLevel3 from "{{site.baseurl}}/assets/js/GameEnginev1.1/PeppaLevel3.js";
    import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    const gameLevelClasses = [PeppaLevel1, PeppaLevel2, PeppaLevel3];

    // Web Server Environment data
    const environment = {
        path:"{{site.baseurl}}",
        pythonURI: pythonURI,
        javaURI: javaURI,
        fetchOptions: fetchOptions,
        gameContainer: document.getElementById("gameContainer"),
        gameCanvas: document.getElementById("gameCanvas"),
        gameLevelClasses: gameLevelClasses

    }
    // Launch Adventure Game
    Game.main(environment);
</script>