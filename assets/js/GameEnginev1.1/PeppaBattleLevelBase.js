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
        this.attackCooldownMs = config.attackCooldownMs ?? 280;
        this.attackRange = config.attackRange ?? 160;
        this.lastPlayerHitAt = 0;
        this.lastAttackAt = 0;
        this.attackRequested = false;
        this.battleEnded = false;
        this.messageTimeout = null;

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
            SCALE_FACTOR: 6,
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
            SCALE_FACTOR: config.enemyScale ?? 6,
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
        this.updateHud('Fight! Use WASD to move and SPACE to attack.');
        document.addEventListener('keydown', this.boundKeyDown);
    }

    destroy() {
        document.removeEventListener('keydown', this.boundKeyDown);
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        if (this.hud) {
            this.hud.remove();
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
            if (now - this.lastAttackAt >= this.attackCooldownMs) {
                this.lastAttackAt = now;
                const distance = this.centerDistance(player, boss);
                if (distance <= this.attackRange && !boss.isDefeated) {
                    boss.takeDamage(1);
                    this.updateHud(`Hit! ${this.config.enemyName} took damage.`);
                } else {
                    this.updateHud('Miss! Move closer before attacking.');
                }
            }
        }

        if (!boss.isDefeated && this.areColliding(player, boss) && (now - this.lastPlayerHitAt >= this.playerDamageCooldownMs)) {
            this.lastPlayerHitAt = now;
            this.playerHealth = Math.max(0, this.playerHealth - 1);
            this.updateHud(`${this.config.enemyName} hit you!`);
        }

        if (this.playerHealth <= 0) {
            this.playerHealth = this.playerMaxHealth;
            player.position.x = this.playerSpawn.x;
            player.position.y = this.playerSpawn.y;
            this.updateHud('You were knocked out. Back to your corner!');
        }

        if (boss.isDefeated && !this.battleEnded) {
            this.battleEnded = true;
            this.updateHud(`${this.config.enemyName} defeated! Moving to next level...`);
            this.messageTimeout = setTimeout(() => {
                if (this.gameEnv?.gameControl?.currentLevel) {
                    this.gameEnv.gameControl.currentLevel.continue = false;
                }
            }, 1100);
            return;
        }

        this.updateHud();
    }
}

export default PeppaBattleLevelBase;