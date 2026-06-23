// 🏎️ Mario Kart.JS — Simulador de Corrida
// Desafio de Projeto — Formação Node.js | DIO

const readline = require("readline");

// ==================== PERSONAGENS ====================

const characters = {
  mario: {
    name: "Mario",
    emoji: "🔴",
    speed: 4,
    maneuverability: 3,
    power: 3,
  },
  peach: {
    name: "Peach",
    emoji: "👸",
    speed: 3,
    maneuverability: 4,
    power: 2,
  },
  yoshi: {
    name: "Yoshi",
    emoji: "🦖",
    speed: 2,
    maneuverability: 4,
    power: 3,
  },
  bowser: {
    name: "Bowser",
    emoji: "🐢",
    speed: 5,
    maneuverability: 2,
    power: 5,
  },
  luigi: {
    name: "Luigi",
    emoji: "💚",
    speed: 3,
    maneuverability: 4,
    power: 4,
  },
  dk: {
    name: "Donkey Kong",
    emoji: "🦍",
    speed: 2,
    maneuverability: 2,
    power: 5,
  },
};

// ==================== PISTAS ====================

const TRACK_BLOCKS = ["RETA", "CURVA", "CONFRONTO"];

const BLOCK_ATTRIBUTE = {
  RETA: "speed",
  CURVA: "maneuverability",
  CONFRONTO: "power",
};

const BLOCK_LABELS = {
  RETA: "⚡ RETA",
  CURVA: "🌀 CURVA",
  CONFRONTO: "💥 CONFRONTO",
};

// ==================== UTILITÁRIOS ====================

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function randomBlock() {
  return TRACK_BLOCKS[Math.floor(Math.random() * TRACK_BLOCKS.length)];
}

function pickTwoRandomCharacters() {
  const keys = Object.keys(characters);
  const shuffled = keys.sort(() => Math.random() - 0.5);
  return [characters[shuffled[0]], characters[shuffled[1]]];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function separator(char = "─", len = 50) {
  return char.repeat(len);
}

// ==================== EXIBIÇÃO ====================

function printHeader() {
  console.clear();
  console.log("\n" + separator("═"));
  console.log("  🏁  M A R I O  K A R T . J S  🏁");
  console.log("  Simulador de Corrida — DIO Node.js");
  console.log(separator("═"));
}

function printCharacterCard(char) {
  console.log(`\n  ${char.emoji}  ${char.name.toUpperCase()}`);
  console.log(`     ⚡ Velocidade     : ${"█".repeat(char.speed)}${"░".repeat(5 - char.speed)} (${char.speed})`);
  console.log(`     🌀 Manobrabilidade: ${"█".repeat(char.maneuverability)}${"░".repeat(5 - char.maneuverability)} (${char.maneuverability})`);
  console.log(`     💪 Poder          : ${"█".repeat(char.power)}${"░".repeat(5 - char.power)} (${char.power})`);
}

function printRoundResult(round, block, p1, p2, dice1, dice2, attr, result) {
  console.log(`\n${separator()}`);
  console.log(`  RODADA ${round}/5 — ${BLOCK_LABELS[block]}`);
  console.log(separator());
  console.log(`\n  ${p1.emoji} ${p1.name}: dado[${dice1}] + ${attr}[${p1[attr]}] = ${dice1 + p1[attr]}`);
  console.log(`  ${p2.emoji} ${p2.name}: dado[${dice2}] + ${attr}[${p2[attr]}] = ${dice2 + p2[attr]}`);

  if (result === "tie") {
    console.log(`\n  🤝 EMPATE! Nenhum ponto conquistado.`);
  } else if (block === "CONFRONTO") {
    const loser = result === "p1" ? p2 : p1;
    console.log(`\n  💥 ${loser.emoji} ${loser.name} perdeu o confronto! -1 ponto`);
  } else {
    const winner = result === "p1" ? p1 : p2;
    console.log(`\n  🏆 ${winner.emoji} ${winner.name} venceu a rodada! +1 ponto`);
  }
}

function printScoreBoard(p1, score1, p2, score2) {
  console.log(`\n  Placar: ${p1.emoji} ${p1.name} [${score1}] × [${score2}] ${p2.name} ${p2.emoji}`);
}

// ==================== LÓGICA DO JOGO ====================

function resolveRound(block, p1, p2) {
  const attr = BLOCK_ATTRIBUTE[block];
  const dice1 = rollDice();
  const dice2 = rollDice();
  const total1 = dice1 + p1[attr];
  const total2 = dice2 + p2[attr];

  let result;
  if (total1 > total2) result = "p1";
  else if (total2 > total1) result = "p2";
  else result = "tie";

  return { dice1, dice2, total1, total2, attr, result };
}

async function runRace(p1, p2) {
  let score1 = 0;
  let score2 = 0;

  console.log(`\n${separator("═")}`);
  console.log(`  🚦  CORRIDA INICIADA!`);
  console.log(`  ${p1.emoji} ${p1.name}  vs  ${p2.name} ${p2.emoji}`);
  console.log(separator("═"));

  for (let round = 1; round <= 5; round++) {
    await sleep(400);
    const block = randomBlock();
    const { dice1, dice2, attr, result } = resolveRound(block, p1, p2);

    if (block === "CONFRONTO") {
      if (result === "p1") {
        score2 = Math.max(0, score2 - 1);
      } else if (result === "p2") {
        score1 = Math.max(0, score1 - 1);
      }
    } else {
      if (result === "p1") score1++;
      else if (result === "p2") score2++;
    }

    printRoundResult(round, block, p1, p2, dice1, dice2, attr, result);
    printScoreBoard(p1, score1, p2, score2);
  }

  return { score1, score2 };
}

function printFinalResult(p1, score1, p2, score2) {
  console.log(`\n${separator("═")}`);
  console.log("  🏁  FIM DE CORRIDA  🏁");
  console.log(separator("═"));
  console.log(`\n  Resultado Final:`);
  console.log(`    ${p1.emoji} ${p1.name.padEnd(14)} ${score1} pts`);
  console.log(`    ${p2.emoji} ${p2.name.padEnd(14)} ${score2} pts`);
  console.log();

  if (score1 > score2) {
    console.log(`  🥇 VENCEDOR: ${p1.emoji} ${p1.name.toUpperCase()}! PARABÉNS!`);
  } else if (score2 > score1) {
    console.log(`  🥇 VENCEDOR: ${p2.emoji} ${p2.name.toUpperCase()}! PARABÉNS!`);
  } else {
    console.log("  🤝 EMPATE! Que corrida equilibrada!");
  }

  console.log(`\n${separator("═")}\n`);
}

function promptPlayAgain() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question("  Jogar novamente? (s/n): ", (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "s");
    });
  });
}

// ==================== MAIN ====================

async function main() {
  printHeader();

  let playing = true;

  while (playing) {
    const [p1, p2] = pickTwoRandomCharacters();

    console.log("\n  Personagens sorteados:");
    printCharacterCard(p1);
    printCharacterCard(p2);

    await sleep(600);

    const { score1, score2 } = await runRace(p1, p2);

    printFinalResult(p1, score1, p2, score2);

    playing = await promptPlayAgain();
    if (playing) printHeader();
  }

  console.log("\n  Obrigado por jogar! 🏎️\n");
  process.exit(0);
}

main();
