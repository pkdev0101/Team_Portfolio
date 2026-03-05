/**
 * GameLevelCustom.js
 */
import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player           from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc              from '/assets/js/GameEnginev1/essentials/Npc.js';
import Barrier          from '/assets/js/GameEnginev1/essentials/Barrier.js';

class GameLevelCustom {
  constructor(gameEnv) {
    const path   = gameEnv.path;        
    const width  = gameEnv.innerWidth;  
    const height = gameEnv.innerHeight; 

     const backgroundConfig = {
      id: "bg-main",
      src: `${path}/images/backgrounds/level1.png`, 
      x: 0,
      y: 0,
      width: width,
      height: height,
      parallax: 0.4, 
      zIndex: 0
    };

   const playerConfig = {
      id: "player",
      src: `${path}/images/players/player.png`, 
      x: Math.floor(width * 0.10),
      y: Math.floor(height * 0.75),
      scale: 1.0,
      speed: 6,
      // Hitbox tuning: 0.2 means "shrink hitbox by 20%" if your engine supports it
      hitbox: { widthPercentage: 0.15, heightPercentage: 0.15 },
      zIndex: 5
    };

    const friendlyNpcConfig = {
      id: "npc-friendly",
      src: `${path}/images/npcs/friendly.png`, // <- change to your file
      x: Math.floor(width * 0.45),
      y: Math.floor(height * 0.75),
      scale: 1.0,
      zIndex: 5,
      
         dialog: [
        "Hey! Want a quick quiz?",
        "Nice job getting this far!",
        "Tip: Watch the hitboxes!"
      ]
    };

    
    const enemyNpcConfig = {
      id: "npc-enemy",
      src: `${path}/images/npcs/enemy.png`, // <- change to your file
      x: Math.floor(width * 0.70),
      y: Math.floor(height * 0.75),
      scale: 1.0,
      zIndex: 5,
      // Example movement idea (patrol). Your engine may use different fields.
      behavior: "patrol",
      patrolMinX: Math.floor(width * 0.60),
      patrolMaxX: Math.floor(width * 0.85),
      patrolSpeed: 2
    };

    // Barriers / Walls (collision rectangles)
    // Use these for platforms, boundaries, finish line triggers, etc.
    const floorBarrierConfig = {
      id: "floor",
      x: 0,
      y: Math.floor(height * 0.88),
      width: width,
      height: Math.floor(height * 0.12),
      visible: false, // toggle true for debugging hitboxes
      hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
      zIndex: 2
    };

    // Finish line barrier (when player collides -> transition to next level)
    const finishBarrierConfig = {
      id: "finish",
      x: width - 80,
      y: Math.floor(height * 0.70),
      width: 40,
      height: Math.floor(height * 0.18),
      visible: true, // often useful to see finish line during dev
      hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
      zIndex: 6,
      // Optional: tag it so your collision logic knows it's special
      isFinish: true
    };

    this.classes = [
      GameEnvBackground, // Step 1: background
      Player,            // Step 2: player
      Npc,               // Step 3: NPCs
      Barrier            // Step 4: barriers/walls
    ];

    try {
      gameEnv.gameObjects = Array.isArray(gameEnv.gameObjects) ? gameEnv.gameObjects : [];

      // Background instance
      gameEnv.gameObjects.push(new GameEnvBackground(backgroundConfig, gameEnv));

      // Player instance
      gameEnv.gameObjects.push(new Player(playerConfig, gameEnv));

      // Friendly NPC + Enemy NPC
      gameEnv.gameObjects.push(new Npc(friendlyNpcConfig, gameEnv));
      gameEnv.gameObjects.push(new Npc(enemyNpcConfig, gameEnv));

      // Barriers (floor + finish)
      gameEnv.gameObjects.push(new Barrier(floorBarrierConfig, gameEnv));
      gameEnv.gameObjects.push(new Barrier(finishBarrierConfig, gameEnv));
    } catch (err) {
      // If your engine auto-builds objects, this block might fail—and that's OK.
      // Remove the manual creation if you see errors like "constructor expects..."
      console.warn("Manual object creation skipped/failed:", err?.message || err);
    }

    try {
      setTimeout(() => {
        try {
          const objs = Array.isArray(gameEnv?.gameObjects) ? gameEnv.gameObjects : [];
          const summary = objs.map(o => ({
            cls: o?.constructor?.name || 'Unknown',      // class name
            id:  o?.canvas?.id || o?.id || '',           // canvas id or object id
            z:   o?.canvas?.style?.zIndex || ''          // rendering order
          }));
          if (window && window.parent) {
            window.parent.postMessage({ type: 'rpg:objects', summary }, '*');
          }
        } catch (_) {}
      }, 250);
    } catch (_) {}

    // 5B) Report environment metrics (like top offset) to builder
    // Useful if the builder draws overlay UI that must align with the game.
    try {
      if (window && window.parent) {
        try {
          const rect = (gameEnv?.container?.getBoundingClientRect)
            ? gameEnv.container.getBoundingClientRect()
            : { top: gameEnv.top || 0, left: 0 };

          window.parent.postMessage({ type: 'rpg:env-metrics', top: rect.top, left: rect.left }, '*');
        } catch (_) {
          try {
            window.parent.postMessage({ type: 'rpg:env-metrics', top: gameEnv.top, left: 0 }, '*');
          } catch (__){}
        }
      }
    } catch (_) {}

    // 5C) Listen for builder commands (toggle walls / set drawn barriers)
    try {
      window.addEventListener('message', (e) => {
        if (!e?.data) return;

        // Command: show/hide all Barriers (hitbox debug toggle)
        if (e.data.type === 'rpg:toggle-walls') {
          const show = !!e.data.visible;

          if (Array.isArray(gameEnv?.gameObjects)) {
            for (const obj of gameEnv.gameObjects) {
              if (obj instanceof Barrier) obj.visible = show;
            }
          }
        }

        // Command: builder sends a list of barrier rectangles to render
        else if (e.data.type === 'rpg:set-drawn-barriers') {
          const arr = Array.isArray(e.data.barriers) ? e.data.barriers : [];

          // Track overlay barriers so we can replace them next time
          window.__overlayBarriers = window.__overlayBarriers || [];

          // Remove old overlay barriers safely
          try {
            for (const ob of window.__overlayBarriers) ob?.destroy?.();
          } catch (_) {}
          window.__overlayBarriers = [];

          // Add new overlay barriers
          for (const bd of arr) {
            try {
              const data = {
                id: bd.id,
                x: bd.x,
                y: bd.y,
                width: bd.width,
                height: bd.height,
                visible: !!bd.visible,
                // 0 shrink means "exact rectangle", good for editor-drawn walls
                hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
                fromOverlay: true
              };

              const bobj = new Barrier(data, gameEnv);
              gameEnv.gameObjects.push(bobj);
              window.__overlayBarriers.push(bobj);
            } catch (_) {}
          }
        }
      });
    } catch (_) {}

    /* BUILDER_ONLY_END */
  }
}

// Engine reads this export to know what levels exist
export const gameLevelClasses = [GameLevelCustom];