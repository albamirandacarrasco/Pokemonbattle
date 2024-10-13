// Requerimos las clases de Pokémon y Move desde los módulos
const Pokemon = require('./Pokemon');
const Move = require('./Move');
const Type = require('./Type');

// Para leer entradas del jugador     
const readlineSync = require('readline-sync');

const pokemons = [
    new Pokemon('Pikachu', 'Eléctrico', 35, 35, 55, new Move('Impactrueno', 10)),
    new Pokemon('Charmander', 'Fuego', 39, 39, 52, new Move('Llamarada', 12)),
    new Pokemon('Squirtle', 'Agua', 44, 44, 48, new Move('Pistola Agua', 8)),
    new Pokemon('Bulbasaur', 'Planta', 45, 45, 49, new Move('Latigazo', 9)),
    new Pokemon('Jigglypuff', 'Normal', 115, 115, 45, new Move('Canto', 5)),
    new Pokemon('Eevee', 'Normal', 55, 55, 55, new Move('Placaje', 6)),
    new Pokemon('Meowth', 'Normal', 40, 40, 45, new Move('Arañazo', 7)),
    new Pokemon('Psyduck', 'Agua', 50, 50, 52, new Move('Confusión', 8)),
    new Pokemon('Machop', 'Lucha', 70, 70, 80, new Move('Golpe Karate', 10)),
    new Pokemon('Gastly', 'Fantasma', 30, 30, 35, new Move('Bola Sombra', 9)),
];

//Pokemon aleatorio
function getRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    return pokemons[randomIndex];
}

// Función principal del simulador de combate
function battle(player, enemy) {
    let playerTurn = true; // Controla de quién es el turno
    console.log(`¡Comienza el combate entre ${player.name} y ${enemy.name}!`);

    // El combate continúa mientras ambos Pokémon tengan HP mayor que 0
    while (player.hpCurrent > 0 && enemy.hpCurrent > 0) {

        if (playerTurn) {
            console.log(`\nTurno de ${player.name}`);
            const action = readlineSync.question('¿Quieres atacar (1) o curarte (2)? ');

            if (action === '1') {
                // Mostrar movimientos disponibles de Pokemon
                console.log(`Movimientos disponibles de ${player.name}:`);     
                player.moves.forEach((move, index) => {
                    console.log(`${index + 1}: ${move.attackName} (Daño: ${move.baseDamage})`);
                });     
                const damage = player.
                attackEnemy(0, enemy);
                console.log(`${player.name} atacó a ${enemy.name} y causó ${damage} de daño.`);
                console.log(`${enemy.name} tiene ${enemy.hpCurrent} de vida`)
                
            } else if (action === '2') {
                player.heal();

                console.log(`${player.name} se ha curado.`);
            }
        } else {
            console.log(`\nTurno de ${enemy.name}`);
            const action = Math.random() > 0.5 ? 'attack' : 'heal';
            if (action === 'attack') {
                const moveIndex = Math.floor(Math.random() * enemy.moves.length);
                const damage = enemy.attackEnemy(moveIndex, player);
                console.log(`${enemy.name} atacó a ${player.name} y causó ${damage} de daño.`);
            } else {
                enemy.heal();
                console.log(`${enemy.name} se ha curado.`);
            }
        }
        playerTurn = !playerTurn;
    }

    // Fin del combate
    if (player.hpCurrent <= 0) {
        console.log(`¡${player.name} ha sido derrotado!`);
    } else {
        console.log(`¡${enemy.name} ha sido derrotado!`);
    }
}

// Elegimos un Pokémon aleatorio para el jugador y otro para el enemigo
const playerPokemon = getRandomPokemon(); // Pokémon del jugador
const enemyPokemon = getRandomPokemon(); // Pokémon del enemigo

// Ejecutamos la función de combate
battle(playerPokemon, enemyPokemon);