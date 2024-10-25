require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} estou pronto!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "help":
      interaction.reply(
        `**COMANDOS!**\n
  **X/Y** - Rolagem padrão para jogadores de Capharnaum,
  **X** é o número total de dados e **Y** é quantos são adicionados ao resultado.
  O último dado é o **Dado Dragão**.
              
  **X/Y SD** - Rolagem para o mestre,
  **X** é o número total de dados e **Y** é quantos são adicionados ao resultado.
  **Não há Dado Dragão!**`
      );
      break;

    case "mapa-mundo":
      await interaction.reply({
        files: ["src/Tabelas/Capharnaum Map.png"],
      });
      break;

    case "mapa-jazirat":
      await interaction.reply({
        files: ["src/Tabelas/Jazirat.png"],
      });
      break;

    case "virtudes-heroicas":
      await interaction.reply({
        files: ["src/Tabelas/HeroicVirtues.png"],
      });
      break;

    case "avancos":
      await interaction.reply({
        files: ["src/Tabelas/Avancos.png"],
      });
      break;

    case "pontos-de-aventura":
      await interaction.reply({
        files: ["src/Tabelas/APAwards.png"],
      });
      break;

    case "efeitos-magicos":
      await interaction.reply({
        files: ["src/Tabelas/MagicalEffects.png"],
      });
      break;

    case "detectar-magia":
      await interaction.reply({
        files: ["src/Tabelas/DetectMagic.png"],
      });
      break;

    case "dificuldade-magia":
      await interaction.reply({
        files: ["src/Tabelas/SpellDifficulty.png"],
      });
      break;

    case "dificuldade-quiromancia":
      await interaction.reply({
        files: ["src/Tabelas/DificuldadeChiromancia.png"],
      });
      break;

    case "venenos":
      await interaction.reply({
        files: ["src/Tabelas/Venenos.png"],
      });
      break;

    case "riqueza":
      await interaction.reply({
        files: ["src/Tabelas/WealthLevel.png"],
      });
      break;

    default:
      interaction.reply("Comando não reconhecido.");
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const regex = /^(\d+)\/(\d+)( SD)?/;
  const match = message.content.match(regex);

  if (match) {
    const [_, total, resultado, sd] = match;

    if (sd) {
      const resultadoFinal = rolagem(total, resultado);
      message.channel.send(`${resultadoFinal}`);
    } else {
      const resultadoFinal = rolagemMD(total, resultado);
      message.channel.send(`${resultadoFinal}`);
    }
  }
});

function dado() {
  return Math.floor(Math.random() * 6) + 1;
}

function rolagemMD(total, resultado) {
  let resultadosDados = [];
  let valorFinal = 0;
  let magnitude = 0;
  let resultadosFormatados = "";

  for (let i = 0; i < total; i++) {
    let valorAtual = dado();
    if (i >= total - 2) {
      let dragonDie = 0;
      dragonDie += valorAtual;
      if (valorAtual === 6) {
        while (true) {
          valorAtual = dado();
          dragonDie += valorAtual;
          if (valorAtual != 6) {
            break;
          }
        }
      }
      resultadosDados.push(dragonDie);
    } else {
      resultadosDados.push(valorAtual);
    }
  }

  console.log("Resultados dos dados:", resultadosDados);

  resultadosDados.sort(function (a, b) {
    return b - a;
  });

  for (let i = 0; i < resultadosDados.length; i++) {
    if (i < resultado) {
      valorFinal += resultadosDados[i];
      resultadosFormatados += ` **${resultadosDados[i]}**`;
    } else {
      resultadosFormatados += ` ${resultadosDados[i]}`;
      if (resultadosDados[i] >= 6) {
        magnitude += 2;
      } else if (resultadosDados[i] === 1) {
        magnitude += 0;
      } else {
        magnitude += 1;
      }
    }
  }

  resultadoFinal = `**${total}/${resultado}**\n\nDados:${resultadosFormatados}\nResultado: **${valorFinal}**\nMagnitude: **${magnitude}**`;
  return resultadoFinal;
}

function rolagem(total, resultado) {
  let resultadosDados = [];
  let valorFinal = 0;
  let magnitude = 0;
  let resultadosFormatados = "";

  for (let i = 0; i < total; i++) {
    let valorAtual = dado();
    resultadosDados.push(valorAtual);
  }

  console.log("Resultados dos dados:", resultadosDados);

  resultadosDados.sort(function (a, b) {
    return b - a;
  });

  for (let i = 0; i < resultadosDados.length; i++) {
    if (i < resultado) {
      valorFinal += resultadosDados[i];
      resultadosFormatados += ` **${resultadosDados[i]}**`;
    } else {
      resultadosFormatados += ` ${resultadosDados[i]}`;
      if (resultadosDados[i] >= 6) {
        magnitude += 2;
      } else if (resultadosDados[i] === 1) {
        magnitude += 0;
      } else {
        magnitude += 1;
      }
    }
  }

  resultadoFinal = `${total}/${resultado}\nDados:${resultadosFormatados}\nResultado: **${valorFinal}**\nMagnitude: **${magnitude}**`;
  return resultadoFinal;
}

client.login(process.env.TOKEN);
