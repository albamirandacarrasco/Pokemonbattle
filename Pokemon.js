const Move = require('./Move');

class Pokemon {
    constructor(name, type, hpMax, attack, defense, move) {
        this.name = name; 
        this.type = type; 
        this.hpMax = hpMax; 
        this.hpCurrent = hpMax; 
        this.attack = attack; 
        this.defense = defense; 
        this.moves = [move]; 
        this.healed = false; 
    }

    // Método para atacar, elige un movimiento y calcula el daño infligido
    attackEnemy(moveIndex, enemy) {
        const move = this.moves[moveIndex]; 
        const randomFactor = Math.random() * (1.0 - 0.85) + 0.85; 
        const damage = Math.max(1, Math.floor((this.attack / enemy.defense) * move.baseDamage * randomFactor)); 
        enemy.hpCurrent -= damage; 
        return damage; 
    }

    // Método para curar, solo puede usarlo una vez por combate
    heal() {
        if (!this.healed) {
            this.hpCurrent = Math.min(this.hpMax, this.hpCurrent + Math.floor(this.hpMax / 2)); 
            //se ha curao
            this.healed = true; 
        }
    }
}

module.exports = Pokemon;