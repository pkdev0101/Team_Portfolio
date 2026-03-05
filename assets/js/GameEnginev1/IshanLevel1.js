// Adventure Game Custom Level
// Exported from GameBuilder on 2026-03-05T20:23:59.225Z
// How to use this file:
// 1) Save as assets/js/adventureGame/IshanLevel1.js in your repo.
// 2) Reference it in your runner or level selector. Examples:
//    import GameLevelPlanets from '/assets/js/GameEnginev1/GameLevelPlanets.js';
//    import IshanLevel1 from '/assets/js/adventureGame/IshanLevel1.js';
//    export const gameLevelClasses = [GameLevelPlanets, IshanLevel1];
//    // or pass it directly to your GameControl as the only level.
// 3) Ensure images exist and paths resolve via 'path' provided by the engine.
// 4) You can add more objects to this.classes inside the constructor.

import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc from '/assets/js/GameEnginev1/essentials/Npc.js';
import Barrier from '/assets/js/GameEnginev1/essentials/Barrier.js';

/**
 * Maze-style custom level with one playable character, two NPCs, and invisible barriers.
 *
 * @class IshanLevel1
 */
class IshanLevel1 {
    /**
     * Builds the level object list consumed by `GameLevel`/`GameControl`.
     *
     * @param {Object} gameEnv - Engine runtime environment.
     * @param {string} gameEnv.path - Base path for asset resolution.
     * @param {number} gameEnv.innerWidth - Canvas width provided by runner/viewport.
     * @param {number} gameEnv.innerHeight - Canvas height provided by runner/viewport.
     */
    constructor(gameEnv) {
        const path = gameEnv.path;
        // Kept for optional responsive placement calculations in future updates.
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        /**
         * Background visual configuration.
         * Purpose: provides the static world art for the maze level.
         *
         * Key selections:
         * - `src`: alien planet scene to match the maze theme.
         * - `pixels`: native image dimensions used for accurate engine scaling.
         */
        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/alien_planet.jpg",
            pixels: { height: 772, width: 1134 }
        };

        /**
         * Player sprite and movement configuration.
         * Purpose: defines the controllable astronaut character.
         *
         * Key selections:
         * - `SCALE_FACTOR: 5` keeps sprite readable without dominating corridors.
         * - `STEP_FACTOR: 1000` gives responsive movement in a compact maze.
         * - `ANIMATION_RATE: 50` keeps motion smooth and consistent.
         * - `INIT_POSITION` starts the player near the maze entrance.
         * - Direction rows map each movement vector to the sprite sheet.
         * - `hitbox` at zero percentages uses default collision footprint.
         * - Arrow key map supports classic controls.
         */
        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/astro.png",
            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: 300 },
            pixels: { height: 770, width: 513 },
            orientation: { rows: 4, columns: 4 },
            down: { row: 0, start: 0, columns: 3 },
            downRight: { row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
            downLeft: { row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },
            left: { row: 2, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            up: { row: 3, start: 0, columns: 3 },
            upLeft: { row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
            upRight: { row: 3, start: 0, columns: 3, rotate: -Math.PI/16 },
            hitbox: { widthPercentage: 0, heightPercentage: 0 },
            keypress: { up: 38, left: 37, down: 40, right: 39 }
            };

        /**
         * Intro NPC at the maze start.
         * Purpose: gives opening guidance/challenge text to the player.
         *
         * Key selections:
         * - `INIT_POSITION` places NPC near spawn for immediate context.
         * - `SCALE_FACTOR: 8` keeps NPC visible but secondary to player.
         * - `dialogues` and `greeting` provide the onboarding prompt.
         * - `hitbox` percentages tighten interaction/collision feel.
         */
        const npcData1 = {
            id: '67',
            greeting: 'Welcome to the maze. Do you think you can complete it?',
            src: path + "/images/gamify/tux.png",
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 200, y: 300 },
            pixels: { height: 256, width: 352 },
            orientation: { rows: 8, columns: 11 },
            down: { row: 0, start: 0, columns: 3 },
            right: { row: Math.min(1, 8 - 1), start: 0, columns: 3 },
            left: { row: Math.min(2, 8 - 1), start: 0, columns: 3 },
            up: { row: Math.min(3, 8 - 1), start: 0, columns: 3 },
            upRight: { row: Math.min(3, 8 - 1), start: 0, columns: 3 },
            downRight: { row: Math.min(1, 8 - 1), start: 0, columns: 3 },
            upLeft: { row: Math.min(2, 8 - 1), start: 0, columns: 3 },
            downLeft: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: ['Welcome to the maze. Do you think you can complete it?'],
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } }
        };

        /**
         * Goal NPC near the maze exit.
         * Purpose: provides completion feedback when the player reaches the end.
         *
         * Key selections:
         * - `INIT_POSITION` places NPC at top-right as the destination marker.
         * - `SCALE_FACTOR: 10` makes the endpoint visually distinct.
         * - Congratulatory dialogue confirms level completion.
         */
        const npcData2 = {
            id: '68',
            greeting: 'Congrats! You finished the level!',
            src: path + "/images/gamify/tux.png",
            SCALE_FACTOR: 10,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 553, y: 15 },
            pixels: { height: 256, width: 352 },
            orientation: { rows: 8, columns: 11 },
            down: { row: 0, start: 0, columns: 3 },
            right: { row: Math.min(1, 8 - 1), start: 0, columns: 3 },
            left: { row: Math.min(2, 8 - 1), start: 0, columns: 3 },
            up: { row: Math.min(3, 8 - 1), start: 0, columns: 3 },
            upRight: { row: Math.min(3, 8 - 1), start: 0, columns: 3 },
            downRight: { row: Math.min(1, 8 - 1), start: 0, columns: 3 },
            upLeft: { row: Math.min(2, 8 - 1), start: 0, columns: 3 },
            downLeft: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: ['Congrats! You finished the level!'],
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } }
        };

        /**
         * Barrier segment 1.
         * Purpose: creates an invisible collision wall from overlay geometry.
         *
         * Key selections:
         * - `visible: false` keeps maze walls hidden from rendered sprites.
         * - `fromOverlay: true` indicates this rectangle came from builder overlay data.
         */
        const dbarrier_1 = {
            id: 'dbarrier_1', x: 11, y: 195, width: 237, height: 43, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };

        /**
         * Barrier segment 2.
         * Purpose: vertical blocking region to shape corridor traversal.
         */
        const dbarrier_2 = {
            id: 'dbarrier_2', x: 244, y: 128, width: 65, height: 108, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };

        /**
         * Barrier segment 3.
         * Purpose: long horizontal block to enforce maze routing.
         */
        const dbarrier_3 = {
            id: 'dbarrier_3', x: 240, y: 78, width: 299, height: 57, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };

        /**
         * Barrier segment 4.
         * Purpose: small top-right blocker near the finish area.
         */
        const dbarrier_4 = {
            id: 'dbarrier_4', x: 510, y: 31, width: 48, height: 46, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        /**
         * Ordered level entities consumed by the engine.
         * Purpose: controls load order and gameplay structure.
         *
         * Key selections:
         * - Background first, then player and NPCs, then collision barriers.
         * - This order ensures visual setup and interactions initialize predictably.
         */
        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            { class: Npc, data: npcData2 },
            { class: Barrier, data: dbarrier_1 },
            { class: Barrier, data: dbarrier_2 },
            { class: Barrier, data: dbarrier_3 },
            { class: Barrier, data: dbarrier_4 }
        ];

        
    }
}

export default IshanLevel1;