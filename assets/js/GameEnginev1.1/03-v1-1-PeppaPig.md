---
layout: opencs
title: Peppa Pig
permalink: /gamify/gpeppaPigv1-1
---

<style>
    /* Full-page game viewport below site header (no engine changes) */
    #gameContainer {
        position: fixed !important;
        left: 0 !important;
        right: 0 !important;
        top: var(--peppa-header-offset, 0px) !important;
        bottom: 0 !important;
        width: auto !important;
        height: auto !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        transform: none !important;
        overflow: hidden;
        z-index: 1;
        background: #000;
    }

    /* IMPORTANT: do not override all canvases, NPC/player sprites are positioned via inline left/top */
    #gameContainer > canvas#gameCanvas,
    #gameContainer > canvas[id^="gameCanvas-"],
    #gameContainer > canvas[id^="peppa-laser-layer-"] {
        display: block;
        margin: 0;
        left: 0 !important;
        top: 0 !important;
    }

    /* Remove global leaderboard/coin widget for this level page */
    #leaderboard-container {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
    }
</style>

<div id="gameContainer">
    <div id="promptDropDown" class="promptDropDown" style="z-index: 9999"></div>
    <canvas id='gameCanvas'></canvas>
</div>

<script type="module">
    // Adventure Game assets locations
    import Game from "{{site.baseurl}}/assets/js/GameEnginev1.1/essentials/Game.js?v=20260331";
    import PeppaLevel1 from "{{site.baseurl}}/assets/js/GameEnginev1.1/PeppaLevel1.js?v=20260331";
    import PeppaLevel2 from "{{site.baseurl}}/assets/js/GameEnginev1.1/PeppaLevel2.js?v=20260331";
    import PeppaPowerUpMenu from "{{site.baseurl}}/assets/js/GameEnginev1.1/PeppaPowerUpMenu.js?v=20260331";
    import PeppaLevel3 from "{{site.baseurl}}/assets/js/GameEnginev1.1/PeppaLevel3.js?v=20260331";
    import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js?v=20260331';

    const gameLevelClasses = [PeppaLevel1, PeppaLevel2, PeppaPowerUpMenu, PeppaLevel3];

    function fitPeppaToViewportBelowHeader() {
        const header = document.querySelector('header');
        const container = document.getElementById('gameContainer');
        if (!container) return;

        const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;
        container.style.setProperty('--peppa-header-offset', `${headerHeight}px`);
        container.style.top = `${headerHeight}px`;
    }

    fitPeppaToViewportBelowHeader();
    window.addEventListener('resize', fitPeppaToViewportBelowHeader);

    // Web Server Environment data
    const environment = {
        path:"{{site.baseurl}}",
        pythonURI: pythonURI,
        javaURI: javaURI,
        fetchOptions: fetchOptions,
        disableContainerAdjustment: true,
        gameContainer: document.getElementById("gameContainer"),
        gameCanvas: document.getElementById("gameCanvas"),
        gameLevelClasses: gameLevelClasses

    }
    // Launch Adventure Game
    Game.main(environment);
</script>