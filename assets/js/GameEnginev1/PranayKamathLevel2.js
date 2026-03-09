/**
 * GameLevelCustom.js
 */
import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc from '/assets/js/GameEnginev1/essentials/Npc.js';
import Barrier from '/assets/js/GameEnginev1/essentials/Barrier.js';

class GameLevelCustom {
  constructor(gameEnv) {
    const path = gameEnv.path;
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;

    // Background
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

    // Player
    const playerConfig = {
      id: "player",
      src: `${path}/images/players/player.png`,
      x: Math.floor(width * 0.10),
      y: Math.floor(height * 0.72),
      scale: 1.0,
      speed: 6,
      hitbox: { widthPercentage: 0.15, heightPercentage: 0.15 },
      zIndex: 5
    };

    // Friendly NPC
    const friendlyNpcConfig = {
      id: "npc-friendly",
      src: `${path}/images/npcs/friendly.png`,
      x: Math.floor(width * 0.35),
      y: Math.floor(height * 0.72),
      scale: 1.0,
      zIndex: 5,
      dialog: [
        "Hey! Welcome to the level!",
        "Avoid the enemy and reach the finish.",
        "Good luck!"
      ]
    };

    // Enemy NPC
    const enemyNpcConfig = {
      id: "npc-enemy",
      src: `${path}/images/npcs/enemy.png`,
      x: Math.floor(width * 0.65),
      y: Math.floor(height * 0.72),
      scale: 1.0,
      zIndex: 5,
      behavior: "patrol",
      patrolMinX: Math.floor(width * 0.55),
      patrolMaxX: Math.floor(width * 0.82),
      patrolSpeed: 2
    };

    // Extra friendly NPC
    const npc2Config = {
      id: "npc-helper",
      src: `${path}/images/npcs/friendly.png`,
      x: Math.floor(width * 0.25),
      y: Math.floor(height * 0.72),
      scale: 1.0,
      zIndex: 5,
      dialog: [
        "Watch out for the enemy ahead!",
        "Stay focused and keep moving!",
        "You're almost there!"
      ]
    };

    // Boss NPC using boss.png
    const bossNpcConfig = {
      id: "npc-boss",
      src: `${path}/images/gamify/water/boss.png`,
      x: Math.floor(width * 0.82),
      y: Math.floor(height * 0.72),
      scale: 1.2,
      zIndex: 6,
      behavior: "patrol",
      patrolMinX: Math.floor(width * 0.72),
      patrolMaxX: Math.floor(width * 0.93),
      patrolSpeed: 1.5
    };

    // Floor barrier
    const floorBarrierConfig = {
      id: "floor",
      x: 0,
      y: Math.floor(height * 0.88),
      width: width,
      height: Math.floor(height * 0.12),
      visible: false,
      hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
      zIndex: 2
    };

    // Left wall
    const leftWallConfig = {
      id: "left-wall",
      x: 0,
      y: 0,
      width: 20,
      height: height,
      visible: false,
      hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
      zIndex: 2
    };

    // Right wall
    const rightWallConfig = {
      id: "right-wall",
      x: width - 20,
      y: 0,
      width: 20,
      height: height,
      visible: false,
      hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
      zIndex: 2
    };

    // Middle obstacle barrier
    const middleBarrierConfig = {
      id: "middle-barrier",
      x: Math.floor(width * 0.50),
      y: Math.floor(height * 0.78),
      width: 80,
      height: 40,
      visible: true,
      hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
      zIndex: 4
    };

    // Finish barrier
    const finishBarrierConfig = {
      id: "finish",
      x: width - 70,
      y: Math.floor(height * 0.70),
      width: 30,
      height: Math.floor(height * 0.18),
      visible: false,
      hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
      zIndex: 6,
      isFinish: true
    };

    this.classes = [
      GameEnvBackground,
      Player,
      Npc,
      Barrier
    ];

    gameEnv.gameObjects = Array.isArray(gameEnv.gameObjects) ? gameEnv.gameObjects : [];

    // Add objects to level
    gameEnv.gameObjects.push(new GameEnvBackground(backgroundConfig, gameEnv));
    gameEnv.gameObjects.push(new Player(playerConfig, gameEnv));
    gameEnv.gameObjects.push(new Npc(friendlyNpcConfig, gameEnv));
    gameEnv.gameObjects.push(new Npc(enemyNpcConfig, gameEnv));
    gameEnv.gameObjects.push(new Npc(npc2Config, gameEnv));
    gameEnv.gameObjects.push(new Npc(bossNpcConfig, gameEnv));

    gameEnv.gameObjects.push(new Barrier(floorBarrierConfig, gameEnv));
    gameEnv.gameObjects.push(new Barrier(leftWallConfig, gameEnv));
    gameEnv.gameObjects.push(new Barrier(rightWallConfig, gameEnv));
    gameEnv.gameObjects.push(new Barrier(middleBarrierConfig, gameEnv));
    gameEnv.gameObjects.push(new Barrier(finishBarrierConfig, gameEnv));
  }
}

export const gameLevelClasses = [GameLevelCustom];