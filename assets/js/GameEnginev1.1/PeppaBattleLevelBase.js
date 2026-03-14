import GamEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import PeppaBossEnemy from './PeppaBossEnemy.js';

class PeppaBattleLevelBase {
    constructor(gameEnv, config) {
        this.gameEnv = gameEnv;
        this.config = config;

        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;
        const path = gameEnv.path;

        this.playerMaxHealth = config.playerHealth ?? 5;
        this.playerHealth = this.playerMaxHealth;
        this.playerDamageCooldownMs = config.playerDamageCooldownMs ?? 650;
        this.attackCooldownMs = config.attackCooldownMs ?? 450;
        this.laserSpeed = config.laserSpeed ?? 14;
        this.lastPlayerHitAt = 0;
        this.lastAttackAt = 0;
        this.lastEnemyLaserAt = 0;
        this.enemyLaserIntervalMs = config.enemyLaserIntervalMs ?? 1100;
        this.attackRequested = false;
        this.battleEnded = false;
        this.messageTimeout = null;
        this.restartTimeout = null;
        this.lasers = [];

        // Floor barrier: characters stay in lower portion (ground), cannot float in air
        this.floorY = height * 0.48;
        this.ceilingY = 0;
        this.playerSpawn = { x: width * 0.12, y: height * 0.72 };

        const image_data_background = {
            name: `peppa-${config.levelId}-arena`,
            greeting: config.levelIntro,
            src: `${path}/images/gamify/PeppaPigBackground.jpg`
        };

        const sprite_data_ishan = {
            id: 'IshanJha',
            greeting: 'Ishan Jha enters the ring. Press SPACE to attack.',
            src: `${path}/images/gamify/IshanJha.png`,
            SCALE_FACTOR: 4,
            STEP_FACTOR: 1100,
            ANIMATION_RATE: 12,
            INIT_POSITION: this.playerSpawn,
            keypress: { up: 87, left: 65, down: 83, right: 68 },
            hitbox: { widthPercentage: 0.4, heightPercentage: 0.6 }
        };

        const sprite_data_enemy = {
            id: config.enemyName,
            greeting: config.enemyGreeting,
            src: `${path}/images/gamify/${config.enemyImage}`,
            SCALE_FACTOR: config.enemyScale ?? 4,
            ANIMATION_RATE: 18,
            INIT_POSITION: { x: width * 0.72, y: height * 0.66 },
            health: config.enemyHealth,
            moveSpeed: config.enemySpeed,
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.6 }
        };

        this.classes = [
            { class: GamEnvBackground, data: image_data_background },
            { class: Player, data: sprite_data_ishan },
            { class: PeppaBossEnemy, data: sprite_data_enemy }
        ];

        this.boundKeyDown = this.handleKeyDown.bind(this);
    }

    initialize() {
        this.createHud();
        // Show enemy greeting prominently at level start
        this.updateHud(`${this.config.enemyName}: "${this.config.enemyGreeting}" — Fight! Use WASD to move and SPACE to fire lasers (shoot in facing direction).`);
        document.addEventListener('keydown', this.boundKeyDown);
        this.createLaserLayer();
    }

    destroy() {
        document.removeEventListener('keydown', this.boundKeyDown);
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        if (this.restartTimeout) {
            clearTimeout(this.restartTimeout);
        }
        if (this.hud) {
            this.hud.remove();
        }
        if (this.laserLayer && this.laserLayer.parentNode) {
            this.laserLayer.remove();
        }
        const loseOverlay = document.getElementById(`peppa-lose-overlay-${this.config.levelId}`);
        if (loseOverlay) {
            loseOverlay.remove();
        }
    }

    showLoseScreenAndRestart() {
        const existing = document.getElementById(`peppa-lose-overlay-${this.config.levelId}`);
        if (existing) {
            existing.remove();
        }

        const overlay = document.createElement('div');
        overlay.id = `peppa-lose-overlay-${this.config.levelId}`;
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 99999; display: flex; flex-direction: column;
            align-items: center; justify-content: center; background: rgba(0,0,0,0.88);
            color: #fff; font-family: Arial, sans-serif; text-align: center; animation: peppa-lose-fade 0.35s ease;
        `;
        overlay.innerHTML = `
            <style>@keyframes peppa-lose-fade { from { opacity: 0; } to { opacity: 1; } }</style>
            <div style="font-size: 44px; font-weight: bold; margin-bottom: 12px; color: #ff5b5b; text-shadow: 0 0 14px rgba(255,91,91,0.85);">YOU LOST</div>
            <div style="font-size: 22px; margin-bottom: 8px;">Try again.</div>
            <div style="font-size: 14px; opacity: 0.8;">Restarting level...</div>
        `;
        document.body.appendChild(overlay);

        const ctrl = this.gameEnv?.gameControl;
        this.restartTimeout = setTimeout(() => {
            overlay.remove();
            // Restart current level index from scratch
            if (ctrl && ctrl.currentLevel && ctrl.currentLevel.gameLevel === this) {
                ctrl.transitionToLevel();
            }
        }, 1500);
    }

    createLaserLayer() {
        this.laserLayer = document.createElement('canvas');
        this.laserLayer.id = `peppa-laser-layer-${this.config.levelId}`;
        this.laserLayer.style.cssText = 'position:absolute; left:0; top:0; pointer-events:none; z-index:15;';
        const container = this.gameEnv.gameContainer || this.gameEnv.container || document.getElementById('gameContainer') || document.body;
        container.style.position = 'relative';
        container.appendChild(this.laserLayer);
        this.laserLayer.width = this.gameEnv.innerWidth;
        this.laserLayer.height = this.gameEnv.innerHeight;
        this.laserLayer.style.width = `${this.gameEnv.innerWidth}px`;
        this.laserLayer.style.height = `${this.gameEnv.innerHeight}px`;
    }

    /** Direction to velocity (vx, vy) for straight lasers */
    directionToVelocity(dir) {
        const s = this.laserSpeed;
        const map = {
            right: [s, 0], left: [-s, 0], up: [0, -s], down: [0, s],
            upRight: [s * 0.707, -s * 0.707], upLeft: [-s * 0.707, -s * 0.707],
            downRight: [s * 0.707, s * 0.707], downLeft: [-s * 0.707, s * 0.707]
        };
        return map[dir] || [s, 0];
    }

    spawnLaser(fromX, fromY, targetX, targetY, isPlayerLaser) {
        const dx = targetX - fromX;
        const dy = targetY - fromY;
        const len = Math.hypot(dx, dy) || 1;
        this.lasers.push({
            x: fromX,
            y: fromY,
            vx: (dx / len) * this.laserSpeed,
            vy: (dy / len) * this.laserSpeed,
            isPlayerLaser,
            life: 60,
            maxLife: 60
        });
    }

    /** Spawn laser in a straight direction (no homing) */
    spawnLaserStraight(fromX, fromY, direction, isPlayerLaser) {
        const [vx, vy] = this.directionToVelocity(direction);
        this.lasers.push({
            x: fromX,
            y: fromY,
            vx, vy,
            isPlayerLaser,
            life: 60,
            maxLife: 60
        });
    }

    updateLasers() {
        const ctx = this.laserLayer?.getContext('2d');
        if (!ctx) return;

        this.laserLayer.width = this.gameEnv.innerWidth;
        this.laserLayer.height = this.gameEnv.innerHeight;
        this.laserLayer.style.width = `${this.gameEnv.innerWidth}px`;
        this.laserLayer.style.height = `${this.gameEnv.innerHeight}px`;

        const player = this.getPlayer();
        const boss = this.getBoss();

        for (let i = this.lasers.length - 1; i >= 0; i--) {
            const L = this.lasers[i];
            L.x += L.vx;
            L.y += L.vy;
            L.life -= 1;

            if (L.life <= 0) {
                this.lasers.splice(i, 1);
                continue;
            }

            // Draw laser
            const alpha = L.life / L.maxLife;
            ctx.save();
            ctx.translate(L.x, L.y);
            ctx.rotate(Math.atan2(L.vy, L.vx));
            const grad = ctx.createLinearGradient(-25, 0, 25, 0);
            const color = L.isPlayerLaser ? 'rgba(0,255,255,0.9)' : 'rgba(255,50,50,0.9)';
            grad.addColorStop(0, 'transparent');
            grad.addColorStop(0.3, color);
            grad.addColorStop(0.7, color);
            grad.addColorStop(1, 'transparent');
            ctx.globalAlpha = alpha;
            ctx.fillStyle = grad;
            ctx.fillRect(-25, -3, 50, 6);
            ctx.shadowColor = L.isPlayerLaser ? 'cyan' : 'red';
            ctx.shadowBlur = 8;
            ctx.fillRect(-25, -2, 50, 4);
            ctx.restore();

            // Collision
            const hitW = 20;
            const hitH = 20;
            const hitLeft = L.x - hitW / 2;
            const hitTop = L.y - hitH / 2;

            if (L.isPlayerLaser && boss && !boss.isDefeated) {
                if (hitLeft < boss.position.x + boss.width && hitLeft + hitW > boss.position.x &&
                    hitTop < boss.position.y + boss.height && hitTop + hitH > boss.position.y) {
                    boss.takeDamage(1);
                    this.updateHud(`Laser hit! ${this.config.enemyName} took damage.`);
                    this.lasers.splice(i, 1);
                }
            } else if (!L.isPlayerLaser && player) {
                if (hitLeft < player.position.x + player.width && hitLeft + hitW > player.position.x &&
                    hitTop < player.position.y + player.height && hitTop + hitH > player.position.y) {
                    if (Date.now() - this.lastPlayerHitAt >= this.playerDamageCooldownMs) {
                        this.lastPlayerHitAt = Date.now();
                        this.playerHealth = Math.max(0, this.playerHealth - 1);
                        this.updateHud(`${this.config.enemyName}'s laser hit you!`);
                    }
                    this.lasers.splice(i, 1);
                }
            }
        }
    }

    showWinScreen() {
        const overlay = document.createElement('div');
        overlay.id = 'peppa-win-overlay';
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 99999; display: flex; flex-direction: column;
            align-items: center; justify-content: center; background: rgba(0,0,0,0.85);
            color: #fff; font-family: Arial, sans-serif; text-align: center; animation: peppa-win-fade 0.5s ease;
        `;
        overlay.innerHTML = `
            <style>@keyframes peppa-win-fade { from { opacity: 0; } to { opacity: 1; } }</style>
            <div style="font-size: 48px; font-weight: bold; margin-bottom: 16px; text-shadow: 0 0 20px gold;">VICTORY!</div>
            <div style="font-size: 22px; margin-bottom: 8px;">You defeated all challengers!</div>
            <div style="font-size: 16px; opacity: 0.9;">The Peppa Pig Ring Champion</div>
            <div style="margin-top: 32px; font-size: 14px; opacity: 0.7;">Press any key or click to continue</div>
        `;
        const finish = () => {
            overlay.remove();
            if (this.gameEnv?.gameControl?.currentLevel) {
                this.gameEnv.gameControl.currentLevel.continue = false;
            }
        };
        overlay.addEventListener('click', finish);
        document.addEventListener('keydown', finish, { once: true });
        document.body.appendChild(overlay);
    }

    enforceFloorBarriers() {
        const player = this.getPlayer();
        const boss = this.getBoss();
        const floorY = this.floorY;
        const height = this.gameEnv.innerHeight;

        if (player) {
            if (player.position.y < floorY) {
                player.position.y = floorY;
                player.velocity.y = 0;
            }
            if (player.position.y + player.height > height) {
                player.position.y = height - player.height;
                player.velocity.y = 0;
            }
        }
        if (boss) {
            if (boss.position.y < floorY) {
                boss.position.y = floorY;
                boss.velocity.y = 0;
            }
            if (boss.position.y + boss.height > height) {
                boss.position.y = height - boss.height;
                boss.velocity.y = 0;
            }
        }
    }

    handleKeyDown(event) {
        if (event.code === 'Space') {
            this.attackRequested = true;
            event.preventDefault();
        }
    }

    createHud() {
        this.hud = document.createElement('div');
        this.hud.id = `peppa-battle-hud-${this.config.levelId}`;
        Object.assign(this.hud.style, {
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: '9999',
            padding: '10px 12px',
            borderRadius: '8px',
            background: 'rgba(0, 0, 0, 0.62)',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            minWidth: '300px',
            pointerEvents: 'none',
            lineHeight: '1.35'
        });

        this.hud.innerHTML = `
            <div style="font-weight:700; margin-bottom:4px;">${this.config.levelTitle}</div>
            <div id="peppa-player-hp-${this.config.levelId}"></div>
            <div id="peppa-enemy-hp-${this.config.levelId}"></div>
            <div id="peppa-message-${this.config.levelId}" style="margin-top:6px; font-size:13px;"></div>
        `;

        const container = this.gameEnv.gameContainer || this.gameEnv.container || document.getElementById('gameContainer') || document.body;
        container.style.position = 'relative';
        container.appendChild(this.hud);
    }

    updateHud(message = null) {
        const playerHpEl = document.getElementById(`peppa-player-hp-${this.config.levelId}`);
        const enemyHpEl = document.getElementById(`peppa-enemy-hp-${this.config.levelId}`);
        const messageEl = document.getElementById(`peppa-message-${this.config.levelId}`);

        const boss = this.getBoss();
        if (playerHpEl) {
            playerHpEl.textContent = `Ishan HP: ${this.playerHealth}/${this.playerMaxHealth}`;
        }
        if (enemyHpEl && boss) {
            enemyHpEl.textContent = `${this.config.enemyName} HP: ${boss.health}/${boss.maxHealth}`;
        }
        if (messageEl && message !== null) {
            messageEl.textContent = message;
        }
    }

    getPlayer() {
        return this.gameEnv.gameObjects.find(obj => obj?.constructor?.name === 'Player');
    }

    getBoss() {
        return this.gameEnv.gameObjects.find(obj => obj?.constructor?.name === 'PeppaBossEnemy');
    }

    areColliding(a, b) {
        if (!a || !b) return false;
        return (
            a.position.x < b.position.x + b.width &&
            a.position.x + a.width > b.position.x &&
            a.position.y < b.position.y + b.height &&
            a.position.y + a.height > b.position.y
        );
    }

    centerDistance(a, b) {
        const ax = a.position.x + a.width / 2;
        const ay = a.position.y + a.height / 2;
        const bx = b.position.x + b.width / 2;
        const by = b.position.y + b.height / 2;
        return Math.hypot(ax - bx, ay - by);
    }

    update() {
        if (this.battleEnded) {
            return;
        }

        const player = this.getPlayer();
        const boss = this.getBoss();
        if (!player || !boss) {
            return;
        }

        const now = Date.now();

        if (this.attackRequested) {
            this.attackRequested = false;
            if (now - this.lastAttackAt >= this.attackCooldownMs && !boss.isDefeated) {
                this.lastAttackAt = now;
                const px = player.position.x + player.width / 2;
                const py = player.position.y + player.height / 2;
                const dir = player.direction || 'right';
                this.spawnLaserStraight(px, py, dir, true);
            }
        }

        // Enemy periodically fires straight lasers at player (aimed at player position when fired)
        if (!boss.isDefeated && now - this.lastEnemyLaserAt >= this.enemyLaserIntervalMs) {
            this.lastEnemyLaserAt = now;
            const bx = boss.position.x + boss.width / 2;
            const by = boss.position.y + boss.height / 2;
            const px = player.position.x + player.width / 2;
            const py = player.position.y + player.height / 2;
            this.spawnLaser(bx, by, px, py, false);
        }

        this.updateLasers();
        this.enforceFloorBarriers();

        if (!boss.isDefeated && this.areColliding(player, boss) && (now - this.lastPlayerHitAt >= this.playerDamageCooldownMs)) {
            this.lastPlayerHitAt = now;
            this.playerHealth = Math.max(0, this.playerHealth - 1);
            this.updateHud(`${this.config.enemyName} hit you!`);
        }

        if (this.playerHealth <= 0 && !this.battleEnded) {
            this.battleEnded = true;
            this.updateHud('You lost. Restarting level...');
            this.showLoseScreenAndRestart();
            return;
        }

        if (boss.isDefeated && !this.battleEnded) {
            this.battleEnded = true;
            const ctrl = this.gameEnv?.gameControl;
            const isFinalLevel = ctrl && ctrl.currentLevelIndex === ctrl.levelClasses?.length - 1;
            if (isFinalLevel) {
                this.showWinScreen();
            } else {
                this.updateHud(`${this.config.enemyName} defeated! Moving to next level...`);
                this.messageTimeout = setTimeout(() => {
                    if (ctrl?.currentLevel) ctrl.currentLevel.continue = false;
                }, 1100);
            }
            return;
        }

        this.updateHud();
    }
}

export default PeppaBattleLevelBase;