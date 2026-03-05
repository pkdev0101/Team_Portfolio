// Adventure Game Custom Level
// Exported from GameBuilder on 2026-03-05T23:13:51.657Z
// How to use this file:
// 1) Save as assets/js/adventureGame/GameLevelIshanlevel1.js in your repo.
// 2) Reference it in your runner or level selector. Examples:
//    import GameLevelPlanets from '/assets/js/GameEnginev1/GameLevelPlanets.js';
//    import GameLevelIshanlevel1 from '/assets/js/adventureGame/GameLevelIshanlevel1.js';
//    export const gameLevelClasses = [GameLevelPlanets, GameLevelIshanlevel1];
//    // or pass it directly to your GameControl as the only level.
// 3) Ensure images exist and paths resolve via 'path' provided by the engine.
// 4) You can add more objects to this.classes inside the constructor.

import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc from '/assets/js/GameEnginev1/essentials/Npc.js';
import Barrier from '/assets/js/GameEnginev1/essentials/Barrier.js';

/**
 * Maze level definition consumed by `GameLevel.create()`.
 *
 * Runtime interaction flow (where interaction occurs in the game loop):
 * 1) `GameControl.gameLoop()` calls `currentLevel.update()` each animation frame.
 * 2) `GameLevel.update()` iterates `gameEnv.gameObjects` and calls each object's `update()`.
 * 3) During those updates, collision state is refreshed (including player↔NPC overlap).
 * 4) NPC keyboard listeners (`Npc.handleKeyDown`) respond to `e/u` input and call
 *    `Npc.handleKeyInteract()`, which checks current collision state before running `interact()`.
 *
 * Property update model during execution:
 * - Objects in this file are static configuration blueprints.
 * - Engine instances mutate runtime properties frame-by-frame (position, velocity,
 *   direction, animation frame, collision events, interaction flags).
 * - Source config values such as `SCALE_FACTOR`, `INIT_POSITION`, and `hitbox`
 *   seed initial state and influence update/collision behavior but are not typically
 *   rewritten in this level file.
 */
class GameLevelIshanlevel1 {
    /**
     * Constructs sprite/obstacle configuration used to instantiate game objects.
     *
     * @param {Object} gameEnv - Active engine environment for this level.
     */
    constructor(gameEnv) {
        this.gameEnv = gameEnv;
        this.midAnimationInterval = null;

        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/alien_planet.jpg",
            pixels: { height: 772, width: 1134 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/astro.png",
            SCALE_FACTOR: 8,
            STEP_FACTOR: 100,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: 336 },
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

        const npcData1 = {
            id: '1',
            greeting: 'Welcome to the level. Your goal is navigate through the maze.',
            src: path + "/images/gamify/tux.png",
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 110, y: 319 },
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
            dialogues: ['Welcome to the level. Your goal is navigate through the maze.'],
            /**
             * Called by engine reaction logic when this NPC needs to display a reaction.
             * Reads collision/interaction context already produced by recent update frames.
             */
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            /**
             * Called from `Npc.handleKeyInteract()` after proximity/collision checks pass.
             * This is the level's interaction hook executed in response to player input.
             */
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } }
        };

        const npcData2 = {
            id: '2',
            greeting: 'Congratulation! You completed the level!',
            src: path + "/images/gamify/tux.png",
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 529, y: 36 },
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
            dialogues: ['Congratulation! You completed the level!'],
            /**
             * Reaction callback used by NPC systems when encounter state changes.
             */
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            /**
             * Interaction callback for completion dialogue at the maze goal.
             */
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } }
        };

        /**
         * Decorative animated NPC placed roughly between start and goal.
         *
         * Animation intent:
         * - This NPC is ambient flavor (not gameplay-critical).
         * - It does not block player movement (`hitbox` is zeroed).
         * - Runtime animation randomization is handled in `initialize()`.
         */
        const midAnimNpcData = {
            id: 'mid_animation_npc',
            greeting: false,
            src: path + "/images/gamify/tux.png",
            // Slightly smaller than key NPCs so it reads as background activity.
            SCALE_FACTOR: 7,
            // Base animation speed; later randomized every tick for variation.
            ANIMATION_RATE: 24,
            INIT_POSITION: {
                // Spawn in a central band of the map so the animation appears "in between" checkpoints.
                x: Math.floor(width * (0.36 + Math.random() * 0.20)),
                y: Math.floor(height * (0.34 + Math.random() * 0.18))
            },
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
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            dialogues: ['...'],
            reaction: function() {},
            interact: function() {}
        };
        const dbarrier_1 = {
            id: 'dbarrier_1', x: 15, y: 215, width: 294, height: 53, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };

        const dbarrier_2 = {
            id: 'dbarrier_2', x: 283, y: 126, width: 64, height: 88, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };

        const dbarrier_3 = {
            id: 'dbarrier_3', x: 293, y: 94, width: 166, height: 41, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };

        const dbarrier_4 = {
            id: 'dbarrier_4', x: 455, y: 8, width: 60, height: 126, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };

        const dbarrier_5 = {
            id: 'dbarrier_5', x: 475, y: 236, width: 89, height: 75, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };
        /**
         * Ordered object registry for `GameLevel.create()`.
         *
         * Runtime update notes:
         * - Each entry becomes an instantiated object pushed into `gameEnv.gameObjects`.
         * - On every frame, object `update()` methods advance mutable state.
         *   Typical updates include:
         *   - `Player`: `pressedKeys` -> `velocity` -> `position`/`direction`.
         *   - `Npc`: `isInteracting` and dialogue visibility based on key input + collisions.
         *   - `Barrier`: collision boundaries remain static while affecting dynamic objects.
         */
        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            { class: Npc, data: midAnimNpcData },
            { class: Npc, data: npcData2 },
            { class: Barrier, data: dbarrier_1 },
            { class: Barrier, data: dbarrier_2 },
            { class: Barrier, data: dbarrier_3 },
            { class: Barrier, data: dbarrier_4 },
            { class: Barrier, data: dbarrier_5 }
        ];

        
    }

    /**
     * Random animation controller for the decorative midpoint NPC.
     * Called by `GameLevel` after all objects are created.
     *
     * Execution details:
     * - Runs every 900ms via `setInterval`.
     * - Finds the decorative NPC by id (`mid_animation_npc`).
     * - Randomizes `direction` so the sprite appears to look around.
     * - Randomizes `animationRate` to create subtle speed changes.
     *
     * Note: `Character.updateAnimationFrame()` advances frames when
     * `frameCounter % animationRate === 0`, so smaller values animate faster.
     */
    initialize() {
        // Allowed facing directions from the sprite sheet configuration.
        const directions = ['up', 'right', 'down', 'left', 'upRight', 'downRight', 'upLeft', 'downLeft'];
        // Helper to keep random selection logic readable.
        const pickRandomDirection = () => directions[Math.floor(Math.random() * directions.length)];

        // Store interval handle so `destroy()` can clear it during level transition.
        this.midAnimationInterval = setInterval(() => {
            // Look up the already-instantiated decorative NPC in live game objects.
            const midNpc = this.gameEnv?.gameObjects?.find(
                (obj) => obj?.spriteData?.id === 'mid_animation_npc'
            );
            // Guard in case object is not ready yet or already destroyed.
            if (!midNpc) return;

            // Randomly change facing direction + animation speed to create ambient motion.
            midNpc.direction = pickRandomDirection();
            // Random speed window: lower = faster animation, higher = slower animation.
            midNpc.animationRate = 10 + Math.floor(Math.random() * 28);
        }, 900);
    }

    /**
     * Cleanup for level-specific timers.
     */
    destroy() {
        if (this.midAnimationInterval) {
            clearInterval(this.midAnimationInterval);
            this.midAnimationInterval = null;
        }
    }
}

export default GameLevelIshanlevel1;