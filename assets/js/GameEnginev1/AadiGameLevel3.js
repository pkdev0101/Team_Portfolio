// Adventure Game Custom Level
// Exported from GameBuilder on 2026-03-05T22:53:32.307Z
// How to use this file:
// 1) Save as assets/js/adventureGame/GameLevelAadilevel3.js in your repo.
// 2) Reference it in your runner or level selector. Examples:
//    import GameLevelPlanets from '/assets/js/GameEnginev1/GameLevelPlanets.js';
//    import GameLevelAadilevel3 from '/assets/js/adventureGame/GameLevelAadilevel3.js';
//    export const gameLevelClasses = [GameLevelPlanets, GameLevelAadilevel3];
//    // or pass it directly to your GameControl as the only level.
// 3) Ensure images exist and paths resolve via 'path' provided by the engine.
// 4) You can add more objects to this.classes inside the constructor.

import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc from '/assets/js/GameEnginev1/essentials/Npc.js';
import Barrier from '/assets/js/GameEnginev1/essentials/Barrier.js';

class GameLevelAadilevel3 {
  constructor(gameEnv) {
    const path = gameEnv.path;
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;

    /**
     * Background object for this level.
     * Purpose: Provides the visual environment (alien planet) that the player explores.
     *
     * Key property selections:
     * - src: Uses the engine-provided `path` so asset URLs resolve correctly in different environments.
     * - pixels: The original image dimensions, used by the engine for scaling/layout decisions.
     */
    const bgData = {
      name: "custom_bg",
      src: path + "/images/gamebuilder/bg/alien_planet.jpg",
      pixels: { height: 772, width: 1134 }
    };

    /**
     * Player object (astronaut) controlled by the user.
     * Purpose: Main character the player moves around the level.
     *
     * Key property selections:
     * - SCALE_FACTOR: Enlarges the sprite so it’s visible relative to the background.
     * - STEP_FACTOR: Controls movement responsiveness/speed.
     * - ANIMATION_RATE: Controls how quickly the sprite animates while moving.
     * - INIT_POSITION: Starting spawn point in the level.
     * - orientation + direction configs: Maps rows/columns of the sprite sheet to movement directions.
     * - keypress: Uses WASD (W=87, A=65, S=83, D=68) for movement controls.
     */
    const playerData = {
      id: 'playerData',
      src: path + "/images/gamebuilder/sprites/astro.png",
      SCALE_FACTOR: 5,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: 100, y: 300 },
      pixels: { height: 770, width: 513 },
      orientation: { rows: 4, columns: 4 },
      down: { row: 0, start: 0, columns: 3 },
      downRight: { row: 1, start: 0, columns: 3, rotate: Math.PI / 16 },
      downLeft: { row: 0, start: 0, columns: 3, rotate: -Math.PI / 16 },
      left: { row: 2, start: 0, columns: 3 },
      right: { row: 1, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
      upLeft: { row: 2, start: 0, columns: 3, rotate: Math.PI / 16 },
      upRight: { row: 3, start: 0, columns: 3, rotate: -Math.PI / 16 },
      hitbox: { widthPercentage: 0, heightPercentage: 0 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    /**
     * NPC object (Pranay) that the player can interact with.
     * Purpose: Adds a character to the level for interaction/dialogue (supports FA2 interaction work later).
     *
     * Key property selections:
     * - INIT_POSITION: Places the NPC near the middle-right so the player can reach them easily.
     * - dialogues: Defines the lines available for random dialogue interactions.
     * - reaction/interact: Hooks into the dialogue system if enabled; otherwise logs a greeting.
     * - hitbox: Non-zero hitbox so proximity/collision-based interactions can register.
     */
    const npcData1 = {
      id: 'Pranay',
      greeting: 'Hello',
      src: path + "/images/gamify/chillguy.png",
      SCALE_FACTOR: 4,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: 500, y: 300 },
      pixels: { height: 512, width: 384 },
      orientation: { rows: 4, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      right: { row: Math.min(1, 4 - 1), start: 0, columns: 3 },
      left: { row: Math.min(2, 4 - 1), start: 0, columns: 3 },
      up: { row: Math.min(3, 4 - 1), start: 0, columns: 3 },
      upRight: { row: Math.min(3, 4 - 1), start: 0, columns: 3 },
      downRight: { row: Math.min(1, 4 - 1), start: 0, columns: 3 },
      upLeft: { row: Math.min(2, 4 - 1), start: 0, columns: 3 },
      downLeft: { row: 0, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: ['Hello'],
      reaction: function () {
        if (this.dialogueSystem) {
          this.showReactionDialogue();
        } else {
          console.log(this.greeting);
        }
      },
      interact: function () {
        if (this.dialogueSystem) {
          this.showRandomDialogue();
        }
      }
    };

    /**
     * Barrier object #1.
     * Purpose: Blocks player movement through a specific rectangular region to shape the playable space.
     *
     * Key property selections:
     * - x, y, width, height: Defines the collision rectangle location/size.
     * - visible: false keeps the barrier invisible during gameplay (acts like an invisible wall).
     * - hitbox: 0.0/0.0 indicates the barrier uses its full rectangle for collision bounds.
     * - fromOverlay: true indicates this barrier was created using the builder overlay tool.
     */
    const dbarrier_1 = {
      id: 'dbarrier_1',
      x: 264,
      y: 2,
      width: 184,
      height: 149,
      visible: false,
      hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
      fromOverlay: true
    };

    /**
     * Barrier object #2.
     * Purpose: Adds a second obstacle region to guide the player’s movement path and prevent clipping.
     *
     * Key property selections:
     * - x, y, width, height: Defines the collision rectangle location/size.
     * - visible: false keeps the barrier invisible during gameplay.
     * - fromOverlay: true indicates this barrier was created using the builder overlay tool.
     */
    const dbarrier_2 = {
      id: 'dbarrier_2',
      x: 268,
      y: 263,
      width: 193,
      height: 99,
      visible: false,
      hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
      fromOverlay: true
    };

    /**
     * Level object registry.
     * Purpose: Defines which objects the engine should construct for this level and in what order.
     *
     * Key property selections:
     * - Background first so it renders behind everything.
     * - Player and NPC next for interaction/visibility.
     * - Barriers last (typically invisible) to enforce collision boundaries.
     */
    this.classes = [
      { class: GameEnvBackground, data: bgData },
      { class: Player, data: playerData },
      { class: Npc, data: npcData1 },
      { class: Barrier, data: dbarrier_1 },
      { class: Barrier, data: dbarrier_2 }
    ];

    // width and height are available if you want to add boundary walls later:
    // (kept here intentionally for future expansion)
    void width; void height;
  }
}

export default GameLevelAadilevel3;